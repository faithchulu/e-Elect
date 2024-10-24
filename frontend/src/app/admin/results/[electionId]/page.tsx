"use client"
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Election } from '@/types/election'
import { Party } from '@/types/party'
import Link from 'next/link'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'

const ElectionResultsPage = () => {
  const [election, setElection] = useState<Election | null>(null)
  const [results, setResults] = useState<any[]>([])
  const [parties, setParties] = useState<Party[]>([])
  const [totalVotes, setTotalVotes] = useState(0)
  const { electionId } = useParams()

  // Fetch election and results data
  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const electionResponse = await axios.get(`http://localhost:4000/api/election/get-election/${electionId}`)
        const resultsResponse = await axios.get(`http://localhost:4000/api/election/view-results/${electionId}`)
        
        setElection(electionResponse.data)
        setResults(resultsResponse.data.results)
        setTotalVotes(resultsResponse.data.totalVoteCount)
        fetchParties(electionResponse.data.parties)
      } catch (error) {
        console.error('Error fetching election data:', error)
      }
    }

    const fetchParties = async (partyIds: string[]) => {
      try {
        const partyDetails = await Promise.all(
          partyIds.map(async (partyId) => {
            const res = await axios.get(`http://localhost:4000/api/party/get-party/${partyId}`)
            return res.data
          })
        )
        setParties(partyDetails)
      } catch (error) {
        console.error('Error fetching party details:', error)
      }
    }

    fetchElectionData()
  }, [electionId])

  if (!election) {
    return (
      <DefaultLayout>
        <div>Getting election results...</div>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <div className="px-4 py-20">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold text-slate-700 mb-4">{election.electionName}</h1>
        <Link href="/admin/active-elections" className="flex bg-meta-4 rounded-md mb-2 shadow-lg px-2 py-1.5 text-white">
          <ArrowLeftEndOnRectangleIcon className='h-6 w-6'/>
          Back to active elections
        </Link>
      </div>
        <h1 className="text-2xl text-black font-semibold mb-4">{election.electionName} Results</h1>
        
        {election.status === 'voting' ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {results.map((result, index) => {
              const party = parties.find((p) => p.id === result.partyId)
              const percentage = totalVotes > 0 ? ((result.voteCount / totalVotes) * 100).toFixed(2) : '0.00'

              return (
                <div key={index} className="mb-4">
                  <h2 className="text-lg font-semibold">{party?.candidate} ({party?.partyName})</h2>
                  <div className="relative bg-gray-200 rounded-full h-8 mt-2">
                    <div
                      className="absolute top-0 left-0 bg-green-500 rounded-full h-4"
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-4 text-sm text-gray-700">
                      {`${percentage}% (${result.voteCount.toLocaleString()} votes)`}
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="mt-4">
              <hr className="border-gray-700 mb-4" />
              <p className="text-lg font-semibold">Total Votes Cast:</p>
              <p className="text-xl blink-animation text-blue-900">{totalVotes.toLocaleString()}</p>
            </div>
          </div>
        ) : (
          <div className="text-lg font-semibold">
            Voting is not yet closed. Results will be available after the voting period ends.
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}

export default ElectionResultsPage
