"use client"
import { useState } from 'react';
import { FingerPrintIcon } from '@heroicons/react/24/outline';

const VoterRegistration = ({params}:{params :{electionid : string}}) => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nrc, setNrc] = useState('');
  const [province, setProvince] = useState('');
  const [constituency, setConstituency] = useState('');
  const [biometricData, setBiometricData] = useState('');

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement logic to submit voter registration data
    console.log('Submitting voter registration data:', { name, email, biometricData });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Voter Registration</h2>
      <p>ID: {params.electionid}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="name" className="mt-1 p-2 block w-full border-gray-300 rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" className="mt-1 p-2 block w-full border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="biometricData" className="block text-sm font-medium text-gray-700">Biometric Data (Fingerprint)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input type="text" id="biometricData" className="p-2 pr-10 block w-full border-gray-300 rounded-md" value={biometricData} onChange={(e) => setBiometricData(e.target.value)} required />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FingerPrintIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
};

export default VoterRegistration;
