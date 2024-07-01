"use client"
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoricalElectionCard from '@/components/Cards/HistoricalElectionCard'; // Adjust the import path as necessary
import { BASE_URL } from '@/config/index';

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

const HistoricalElections = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/elections/historical`);
        setElections(response.data);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElections();
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
        <h2 className="text-2xl font-bold mb-4">Historical Elections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {edata.length > 0 ? (
            edata.map((election) => (
              <HistoricalElectionCard
                key={election.id}
                electionName={election.name}
                politicalParty={election.politicalParty}
                partySlogan={election.partySlogan}
                candidateName={election.candidateName}
                candidateImage={election.candidateImage}
                votingStartDate={election.votingStartDate}
                votingEndDate={election.votingEndDate}
                resultLink={`/elections/results/${election.id}`} // Adjust the link as necessary
              />
            ))
          ) : (
            <p>No historical elections to show.</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HistoricalElections;
