"use client"

import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import { useState } from "react";
import { FingerPrintIcon } from "@heroicons/react/24/outline";

const VoterAuthForm = () => {
  const [step, setStep] = useState(1);
  const [nrcNumber, setNrcNumber] = useState('');
  const [fingerprintScanned, setFingerprintScanned] = useState(false);

  const handleNrcNumberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement validation logic for NRC number if needed
    // For now, just proceed to the next step
    setStep(2);
  };

  const handleFingerprintScan = () => {
    // Implement fingerprint scanning logic here
    // For now, just set fingerprintScanned to true
    setFingerprintScanned(true);
  };

  return (
    <div className="py-30">
      <HorizontalNav/>
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
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
          <div className=" flex flex-col justify-center">
            <h1 className="text-2xl text-black font-semibold mb-4">Step 2: Scan Fingerprint</h1>
            <FingerPrintIcon className="h-20"/>
            <p className="mb-4">Please place your finger on your device's fingerprint scanner for authentication.</p>
            <button onClick={handleFingerprintScan} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Scan Fingerprint
            </button>
            {fingerprintScanned && (
              <p className="text-green-600 mt-2">Fingerprint scanned successfully!</p>
              
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterAuthForm;
