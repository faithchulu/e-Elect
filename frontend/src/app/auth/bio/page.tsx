"use client"
import { useState } from 'react';
import { FingerPrintIcon } from '@heroicons/react/24/outline';

const AuthenticationModule = () => {
  // State variable to store biometric data
  const [biometricData, setBiometricData] = useState('');

  // Function to handle biometric authentication
  const handleAuthentication = () => {
    // Implement logic to authenticate voter's biometric data
    console.log('Authenticating biometric data:', biometricData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Biometric Authentication</h2>
      <div className="mb-4">
        <label htmlFor="biometricData" className="block text-sm font-medium text-gray-700">Biometric Data (Fingerprint)</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" id="biometricData" className="p-2 pr-10 block w-full border-gray-300 rounded-md" value={biometricData} onChange={(e) => setBiometricData(e.target.value)} required />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FingerPrintIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>
      <button onClick={handleAuthentication} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Authenticate</button>
    </div>
  );
};

export default AuthenticationModule;
