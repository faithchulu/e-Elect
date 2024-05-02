"use client"
import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface BallotOption {
  id: number;
  option: string;
}

const VotingModule = ({params}:{params :{electionid : string}}) => {
  // State variables to store selected option and ballot options
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const ballotOptions: BallotOption[] = [
    { id: 1, option: 'Option 1' },
    { id: 2, option: 'Option 2' },
    { id: 3, option: 'Option 3' },
    // Add more options as needed
  ];

  // Function to handle selecting an option
  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
  };

  // Function to handle submitting the vote
  const handleSubmitVote = () => {
    // Implement logic to submit the vote with selected option
    console.log('Submitting vote:', selectedOption);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Voting</h2>
      <p>ID: {params.electionid}</p>
      <p className="text-gray-600 mb-4">Please select your preferred option:</p>
      <div className="space-y-2">
        {ballotOptions.map((option) => (
          <div key={option.id} className="flex items-center">
            <input type="radio" id={`option-${option.id}`} name="option" className="form-radio h-4 w-4 text-blue-500" value={option.id} checked={selectedOption === option.id} onChange={() => handleSelectOption(option.id)} />
            <label htmlFor={`option-${option.id}`} className="ml-2">{option.option}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmitVote} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center">
        <span>Submit Vote</span>
        <CheckCircleIcon className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};

export default VotingModule;
