"use client"
import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface BallotOption {
  id: number;
  option: string;
}

const BallotCreationModule = () => {
  // State variables to store ballot questions and options
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<BallotOption[]>([{ id: 1, option: '' }]);

  // Function to handle adding a new option field
  const handleAddOption = () => {
    const newOption: BallotOption = { id: options.length + 1, option: '' };
    setOptions([...options, newOption]);
  };

  // Function to handle removing an option field
  const handleRemoveOption = (id: number) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  // Function to handle saving the ballot
  const handleSaveBallot = () => {
    // Implement logic to save the ballot with questions and options
    console.log('Saving ballot:', { question, options });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Ballot Creation</h2>
      <div className="mb-4">
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">Ballot Question</label>
        <input type="text" id="question" className="mt-1 p-2 block w-full border-gray-300 rounded-md" value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="options" className="block text-sm font-medium text-gray-700">Ballot Options</label>
        {options.map((option) => (
          <div key={option.id} className="flex items-center mt-1">
            <input type="text" id={`option-${option.id}`} className="p-2 block w-full border-gray-300 rounded-md" value={option.option} onChange={(e) => {
              const updatedOptions = options.map((opt) => opt.id === option.id ? { ...opt, option: e.target.value } : opt);
              setOptions(updatedOptions);
            }} required />
            <button type="button" className="ml-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600" onClick={() => handleRemoveOption(option.id)}>
              <MinusIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button type="button" className="mt-2 p-1 rounded-full bg-green-500 text-white hover:bg-green-600" onClick={handleAddOption}>
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <button onClick={handleSaveBallot} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save Ballot</button>
    </div>
  );
};

export default BallotCreationModule;
