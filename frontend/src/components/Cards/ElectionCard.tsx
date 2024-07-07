import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface ElectionCardProps {
  electionName: string;
  decsription: string;
  noOfCandidates: string;
  votingStartDate: string;
  votingEndDate: string;
  onEdit: () => void;
  onOpenVoting: () => void;
}

const ElectionCard: React.FC<ElectionCardProps> = ({
  electionName,
  decsription,
  noOfCandidates,
  votingStartDate,
  votingEndDate,
  onEdit,
  onOpenVoting,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{electionName}</h2>
        <button onClick={onEdit} className="text-green-600 hover:text-green-800">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2"><strong>Political Party:</strong> {decsription}</p>
      <p className="mt-1"><strong>Number of Candidates:</strong> {noOfCandidates}</p>
      <p className="mt-2"><strong>Voting Starts:</strong> {new Date(votingStartDate).toLocaleString()}</p>
      <p className="mt-1"><strong>Voting Ends:</strong> {new Date(votingEndDate).toLocaleString()}</p>
      <button
        onClick={onOpenVoting}
        className="mt-4 bg-meta-4 text-white px-4 py-2 rounded hover:bg-slate-500"
      >
        Open Voting
      </button>
    </div>
  );
};

export default ElectionCard;
