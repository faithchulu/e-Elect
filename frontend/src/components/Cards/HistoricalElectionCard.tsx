import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ElectionCardProps {
  electionId: string;
  electionName: string;
  decsription: string;
  noOfCandidates: string;
  votingStartDate: string;
  votingEndDate: string;
  status: string;
  onEdit: () => void;
}

const HistoricalElectionCard: React.FC<ElectionCardProps> = ({
  electionId,
  electionName,
  decsription,
  noOfCandidates,
  votingStartDate,
  votingEndDate,
  status,
  onEdit,
}) => {


  const handleOpenVoting = async () => {
    try {
      await axios.post(`https://e-elect-backend.vercel.app/api/election/open-voting/${electionId}`);
      alert('Voting opened successfully!'); // Handle success (optional)
    } catch (error) {
      console.error("Error opening voting:", error);
      alert('Failed to open voting.'); // Handle error (optional)
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-indigo-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-slate-800 font-bold">{electionName}</h2>
        <button onClick={onEdit} className="text-meta-1 hover:text-green-800">
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2">Description: <strong>{decsription}</strong></p>
      <p className="mt-1">Number of Candidates: <strong>{noOfCandidates}</strong></p>
      <p className="mt-1">Status: <strong>{status}</strong></p>
      <p className="mt-1">Start: <strong>{new Date(votingStartDate).toLocaleString()}</strong></p>
      <p className="mt-1 mb-6">Close: <strong>{new Date(votingEndDate).toLocaleString()}</strong></p>

        <Link
          href={`/admin/active-elections/details/${electionId}`}
          className="bg-slate-900 text-white px-4 py-2.5 rounded hover:bg-slate-500"
        >
          View Details
        </Link>
      
    </div>
  );
};

export default HistoricalElectionCard;
