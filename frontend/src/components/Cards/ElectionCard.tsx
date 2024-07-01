import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface ElectionCardProps {
  electionName: string;
  politicalParty: string;
  partySlogan: string;
  candidateName: string;
  candidateImage: string;
  votingStartDate: string;
  votingEndDate: string;
  onEdit: () => void;
  onOpenVoting: () => void;
}

const ElectionCard: React.FC<ElectionCardProps> = ({
  electionName,
  politicalParty,
  partySlogan,
  candidateName,
  candidateImage,
  votingStartDate,
  votingEndDate,
  onEdit,
  onOpenVoting,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{electionName}</h2>
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2"><strong>Political Party:</strong> {politicalParty}</p>
      <p className="mt-1"><strong>Party Slogan:</strong> {partySlogan}</p>
      <p className="mt-1"><strong>Candidate Name:</strong> {candidateName}</p>
      <div className="mt-2">
        <img src={candidateImage} alt={candidateName} className="w-full h-28 object-cover rounded-lg" />
      </div>
      <p className="mt-2"><strong>Voting Starts:</strong> {new Date(votingStartDate).toLocaleString()}</p>
      <p className="mt-1"><strong>Voting Ends:</strong> {new Date(votingEndDate).toLocaleString()}</p>
      <button
        onClick={onOpenVoting}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Open Voting
      </button>
    </div>
  );
};

export default ElectionCard;
