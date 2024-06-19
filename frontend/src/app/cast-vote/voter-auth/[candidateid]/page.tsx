"use client";

import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import { useState, useEffect } from "react";
import { FingerPrintIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Sucess from "@/components/Alerts/Sucess";


const VoterAuthForm = () => {
  const [step, setStep] = useState(1);
  const [nrcNumber, setNrcNumber] = useState('');
  const [fingerprintScanned, setFingerprintScanned] = useState(false);
  const [voteConfirmed, setVoteConfirmed] = useState(false); // New state for vote confirmation


  // New state for candidate and political party
  const [candidateName, setCandidateName] = useState("Charles Ngandwe");
  const [politicalParty, setPoliticalParty] = useState('Progressive aliance party');

  const handleNrcNumberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFingerprintScan = () => {
    setFingerprintScanned(true);
    setStep(3); // Move to the next step after scanning fingerprint
  };

  const handleConfirm = (confirm: boolean) => {
    if (confirm) {
      // Handle the confirmation logic here (e.g., save the vote)
      console.log(`Voted for ${candidateName} of ${politicalParty}`);
      setVoteConfirmed(true); // Set vote confirmation to true
      
    } else {
      // Handle cancellation (e.g., go back to previous step or restart)
      setStep(1);
    }
  };

  useEffect(() => {
    if (voteConfirmed) {
      // Navigate to /results/2456 after 5 seconds
      const timer = setTimeout(() => {
        window.location.href='/results/2456';
      }, 5000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [voteConfirmed]);

  return (
    <div className="py-30">
      <HorizontalNav />
      <Link
        href="/cast-vote/37848dhhd8"
        className="inline-flex items-center ml-4 justify-center rounded-md bg-black px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Back
      </Link>
      {voteConfirmed && (
          <div className="absolute min-h-screen inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <Sucess />
          </div>
        )}
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white relative">
        {step === 1 && (
          <form onSubmit={handleNrcNumberSubmit}>
            <h1 className="text-2xl text-black font-semibold mb-4">Step 1: Enter NRC Number</h1>
            <div className="mb-4">
              <label htmlFor="nrcNumber" className="block text-sm font-medium text-gray-700">
                NRC Number
              </label>
              <input
                type="text"
                id="nrcNumber"
                className="mt-1 p-2 border border-green-500 rounded-md w-full"
                value={nrcNumber}
                onChange={(e) => setNrcNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Next
            </button>
          </form>
        )}
        {step === 2 && (
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl text-black font-semibold mb-4">Step 2: Scan Fingerprint</h1>
            <FingerPrintIcon className="h-20" />
            <p className="mb-4">Please place your finger on the fingerprint scanner for authentication.</p>
            <button onClick={handleFingerprintScan} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Scan Fingerprint
            </button>
            {fingerprintScanned && (
              <p className="text-green-600 mt-2">Fingerprint scanned successfully!</p>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl text-black font-semibold mb-4">Step 3: Confirm Your Vote</h1>
            <p className="mb-4">Are you sure you want to vote for <strong>{candidateName}</strong> of <strong>{politicalParty}</strong>?</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleConfirm(true)}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Yes, I'm Sure
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="bg-meta-1 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                No, Cancel
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default VoterAuthForm;
