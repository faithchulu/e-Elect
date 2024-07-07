"use client"
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ElectionCard from '@/components/Cards/ElectionCard'; // Adjust the import path as necessary
import { BASE_URL } from '@/config/index';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const edata = [ {
  id : 1,
  name : "Test",
  politicalParty : "Party A",
  partySlogan : "Slogan a",
  candidateName : "candidateName",
  candidateImage : " election.candidateImage ",
  votingStartDate : "03/04/2022",
  votingEndDate   : " 04/05/2022",
}
]

const ActiveElections = () => {
  const [elections, setElections] = useState([]);
  

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/elections/active`);
        setElections(response.data);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    
    setElections(edata);
  }, []);

  const handleEdit = (id) => {
    // Navigate to edit election page
    // For example: router.push(`/admin/edit-election/${id}`);
  };

  const handleOpenVoting = (id) => {
    // Navigate to open voting page or perform the action to open voting
    // For example: router.push(`/voting/${id}`);
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-4">Active Elections</h2>
          <Link to="/active-election/create-election" className="flex bg-meta-4 rounded-md shadow-lg px-2 py-1.5 text-white">
            <PlusCircleIcon className='h-6 w-6'/>
            New Election
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {elections.length > 0 ? (
            edata.map((election) => (
              <ElectionCard
                key={election.id}
                electionName={election.name}
                politicalParty={election.politicalParty}
                partySlogan={election.partySlogan}
                candidateName={election.candidateName}
                candidateImage={election.candidateImage}
                votingStartDate={election.votingStartDate}
                votingEndDate={election.votingEndDate}
                onEdit={() => handleEdit(election.id)}
                onOpenVoting={() => handleOpenVoting(election.id)}
              />
            ))
          ) : (
            <p>No active elections to show.</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ActiveElections;
