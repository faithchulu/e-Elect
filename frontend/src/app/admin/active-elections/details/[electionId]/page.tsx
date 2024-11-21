"use client"
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Election } from '@/types/election'
import { Party } from '@/types/party'
import Link from 'next/link'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'

const ElectionDetailsPage = () => {
  const [election, setElection] = useState<Election | null>(null);
  const [parties, setParties] = useState<Party[]>([]); // State to store party details
  const [isConfirmingClose, setIsConfirmingClose] = useState(false); // State to handle modal
  const { electionId } = useParams();

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const response = await axios.get(`https://e-elect-backend.vercel.app/api/election/get-election/${electionId}`);
        setElection(response.data);
        fetchParties(response.data.parties); // Fetch parties once election is set
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching election details:', error);
      }
    };
    
    const fetchParties = async (partyIds: string[]) => {
      try {
        const partyDetails = await Promise.all(
          partyIds.map(async (partyId) => {
            const res = await axios.get(`https://e-elect-backend.vercel.app/api/party/get-party/${partyId}`);
            return res.data; // Return each party's data
          })
        );
        setParties(partyDetails); // Set all party details
      } catch (error) {
        console.error('Error fetching party details:', error);
      }
    };

    fetchElection();
  }, [electionId]);

  const handleCloseElection = async () => {
    try {
      await axios.post(`https://e-elect-backend.vercel.app/api/election/close-voting/${electionId}`);
      alert('Election closed successfully!');
      setElection({ ...election!, status: 'closed' });
      setIsConfirmingClose(false); // Close the modal after the election is closed
    } catch (error) {
      console.error('Error closing election:', error);
    }
  };

  const confirmCloseElection = () => {
    setIsConfirmingClose(true); // Show the confirmation dialog
  };

  const cancelCloseElection = () => {
    setIsConfirmingClose(false); // Dismiss the confirmation dialog
  };

  return (
    <DefaultLayout>
      <div className="p-5">
        {election ? (
          <div>
            <div className='flex justify-between'>
              <h1 className="text-3xl font-bold text-slate-700 mb-4">{election.electionName}</h1>
              <Link href="/admin/active-elections" className="flex bg-meta-4 rounded-md mb-2 shadow-lg px-2 py-1.5 text-white">
                <ArrowLeftEndOnRectangleIcon className='h-6 w-6'/>
                Back to active elections
              </Link>
            </div>
            
            <p><strong>Election Name:</strong> {election.electionName}</p>
            <p><strong>Description:</strong> {election.electionDescription}</p>
            <p><strong>Type:</strong> {election.type}</p>
            <p><strong>Start Date:</strong> {election.startDate}</p>
            <p><strong>End Date:</strong> {election.endDate}</p>
            <p><strong>Status:</strong> {election.status}</p>

            {/* Render the participating parties in a table */}
            <h2 className="mt-4 text-xl font-semibold">Participating Parties</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Party Name</th>
                  <th className="py-2 px-4 border-b">Candidate</th>
                  <th className="py-2 px-4 border-b">Slogan</th>
                </tr>
              </thead>
              <tbody>
                {parties.map((party) => (
                  <tr key={party.id}>
                    <td className="py-2 px-4 border-b">{party.partyName}</td>
                    <td className="py-2 px-4 border-b">{party.candidate}</td>
                    <td className="py-2 px-4 border-b">{party.slogan}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <button 
                className="bg-slate-900 text-white p-2 rounded" 
                onClick={() => window.location.href = `/admin/results/${election.id}`}
              >
                View Results
              </button>

              {election.status === 'voting' && (
                <button 
                  className="bg-meta-1 text-white p-2 rounded ml-4"
                  onClick={confirmCloseElection}
                >
                  Close Election
                </button>
              )}
            </div>

            {/* Confirmation dialog */}
            {isConfirmingClose && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg">
                  <p>Are you sure you want to close this election? Once closed, it cannot be undone.</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      className="bg-meta-1 text-white px-4 py-2 rounded mr-2"
                      onClick={handleCloseElection}
                    >
                      Yes, Close Election
                    </button>
                    <button 
                      className="border border-slate-800 px-4 py-2 rounded"
                      onClick={cancelCloseElection}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading election details...</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ElectionDetailsPage;
