"use client"
import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import HorizontalNav from '@/components/HorizontalNav/HorizontalNav';

interface BallotOption {
  id: number;
  option: string;
  votes: number;
}

const TallyingModule = () => {
  // Mock data for ballot options with initial vote counts
  const [ballotOptions, setBallotOptions] = useState<BallotOption[]>([
    { id: 1, option: 'Option 1', votes: 10 },
    { id: 2, option: 'Option 2', votes: 15 },
    { id: 3, option: 'Option 3', votes: 8 },
    // Add more options as needed
  ]);

  return (
    <div className='py-30'>
      <HorizontalNav/>
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Vote Tally</h2>
        <p className="text-gray-600 mb-4">Real-time vote tallying:</p>
        <div className="space-y-2">
          {ballotOptions.map((option) => (
            <div key={option.id} className="flex items-center">
              <span className="font-semibold">{option.option}</span>
              <span className="ml-auto">{option.votes} votes</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TallyingModule;
