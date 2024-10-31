import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Link from 'next/link';

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

const ElectionCard: React.FC<ElectionCardProps> = ({
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
      await axios.post(`http://localhost:4000/api/election/open-voting/${electionId}`);
      alert('Voting opened successfully!'); // Handle success (optional)
    } catch (error) {
      console.error("Error opening voting:", error);
      alert('Failed to open voting.'); // Handle error (optional)
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-indigo-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">{electionName}</h2>
        <button onClick={onEdit} className="text-blue-800 hover:text-blue-600">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2">Description: <strong>{decsription}</strong></p>
      <p className="mt-1">Number of Candidates: <strong>{noOfCandidates}</strong></p>
      <p className="mt-1">Status: <strong>{status}</strong></p>
      <p className="mt-1">Start: <strong>{new Date(votingStartDate).toLocaleString()}</strong></p>
      <p className="mt-1 mb-6">Close: <strong>{new Date(votingEndDate).toLocaleString()}</strong></p>

      {status === "registration" ? (
        <button
          onClick={handleOpenVoting}
          className="bg-meta-4 text-white px-4 py-2 rounded hover:bg-slate-600"
        >
          Open Voting
        </button>
      ) : status === "voting" ? (
        <Link
          href={`/admin/active-elections/details/${electionId}`}
          className="bg-green-700 text-white px-4 py-2.5 rounded hover:bg-slate-500"
        >
          View Details
        </Link>
      ) : null}
    </div>
  );
};

export default ElectionCard;
