"use client";
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Election } from '@/types/election';
import { Party } from '@/types/party';
import Link from 'next/link';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

const ElectionResultsPage = () => {
  const [election, setElection] = useState<Election | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const { electionId } = useParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [verificationStep, setVerificationStep] = useState(0);

  // Fetch election and results data
  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const electionResponse = await axios.get(`https://e-elect-backend.vercel.app/api/election/get-election/${electionId}`);
        const resultsResponse = await axios.get(`https://e-elect-backend.vercel.app/api/election/view-results/${electionId}`);
        
        setElection(electionResponse.data);
        setResults(resultsResponse.data.results);
        setTotalVotes(resultsResponse.data.totalVoteCount);
        fetchParties(electionResponse.data.parties);
      } catch (error) {
        console.error('Error fetching election data:', error);
      }
    };

    const fetchParties = async (partyIds: string[]) => {
      try {
        const partyDetails = await Promise.all(
          partyIds.map(async (partyId) => {
            const res = await axios.get(`https://e-elect-backend.vercel.app/api/party/get-party/${partyId}`);
            return res.data;
          })
        );
        setParties(partyDetails);
      } catch (error) {
        console.error('Error fetching party details:', error);
      }
    };

    fetchElectionData();
  }, [electionId]);

  const handleVerifyClick = () => {
    setOverlayVisible(true);
  };

  const handleConfirm = () => {
    setOverlayVisible(false);
    startVerificationProcess();
  };

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const startVerificationProcess = () => {
    const messages = [
      "Establishing connection with blockchain network...",
      "Starting the verification process. Please hold on as we validate the election results...",
      "Collecting results data from the database. This may take a moment...",
      "Verifying the integrity of the collected results. Ensuring all data is accurate and complete...",
      "Comparing the results with the original votes cast. Please wait while we finalize the verification...",
      `Processing 0/${totalVotes} results`, // Start from 0
      "Processing the verified results. This step may take a few moments...",
      "Finalizing the verification of results. Almost done!",
      "Verification complete! The results are now verified and ready for publication."
    ];
  
    setIsVerifying(true);
    setVerificationStep(0);
    setCurrentMessage(messages[0]); // Show the first message immediately
  
    const verificationInterval = setInterval(() => {
      setVerificationStep((prevStep) => {
        const nextStep = prevStep + 1;
  
        if (nextStep < messages.length) {
          if (prevStep === 5) { // Processing step
            let count = 0; // Initialize count for processing results
            const processingInterval = setInterval(() => {
              if (count < totalVotes) {
                count++;
                setCurrentMessage(`Processing ${count}/${totalVotes} results`); // Update count in message
              } else {
                clearInterval(processingInterval);
                setCurrentMessage(messages[nextStep]); // Show next message after processing
              }
            }, 10); // Adjust the speed as necessary
  
            return nextStep; // Move to the next step
          } else {
            setCurrentMessage(messages[nextStep]); // Show the next message
            return nextStep; // Update to the next step
          }
        } else {
          clearInterval(verificationInterval);
          setIsVerifying(false);
          setCurrentMessage(''); // Clear the message after completion, if needed
          return nextStep; // Update to prevent further updates
        }
      });
    }, 5000); // Adjust the interval timing as necessary
  };
  
  if (!election) {
    return (
      <DefaultLayout>
        <div>Getting election results...</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="px-4 py-20">
        <div className='flex justify-between'>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{election.electionName} Results</h1>
          <Link href="/admin/active-elections" className="flex bg-meta-4 rounded-md mb-2 shadow-lg px-2 py-1.5 text-white">
            <ArrowLeftEndOnRectangleIcon className='h-6 w-6'/>
            Back to active elections
          </Link>
        </div>
        
        {election.status === 'voting' || election.status === 'closed' ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {results.map((result, index) => {
              const party = parties.find((p) => p.id === result.partyId);
              const percentage = totalVotes > 0 ? ((result.voteCount / totalVotes) * 100).toFixed(2) : '0.00';

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
              );
            })}
            <div className="mt-4">
              <hr className="border-gray-700 mb-4" />
              <p className="text-lg font-semibold">Total Votes Cast:</p>
              <p className="text-xl blink-animation text-blue-900">{totalVotes.toLocaleString()}</p>
            </div>

            {/* Verify Results Button */}
            {election.status === 'closed' && (
              <button onClick={handleVerifyClick} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Verify Results
              </button>
            )}
          </div>
        ) : (
          <div className="text-lg font-semibold">
            Election still in registration phase. Results will be available after the voting period begins.
          </div>
        )}
        
        {/* Overlay for Verification Confirmation */}
        {overlayVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Verification</h2>
              <p>Do you wish to proceed with the cryptographic proof and blockchain verification on the election results?</p>
              <div className="flex justify-end mt-4">
                <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                  Yes
                </button>
                <button onClick={handleCancel} className="bg-meta-1 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Current Verification Message */}
        {isVerifying && (

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 py-12 rounded-lg shadow-lg">
              <div className="mt-4">
                 <p className="text-lg text-blue-600">{currentMessage}</p>
              </div>
            </div>
          </div>
          
        )}
      </div>
    </DefaultLayout>
  );
};

export default ElectionResultsPage;
