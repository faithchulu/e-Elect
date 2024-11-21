"use client";
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoricalElectionCard from '@/components/Cards/HistoricalElectionCard'; 
import LOCAL_URL from "@/config/index";
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const HistoricalElections = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        
        const response = await axios.get(`https://e-elect-backend.vercel.app/api/election/closed-elections`);
        setElections(response.data);  // Set fetched elections to state
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    // Call fetchElections inside useEffect
    fetchElections();
  }, []);

  const handleEdit = (id) => {
    // Navigate to edit election page or implement logic
  };

  const handleOpenVoting = (id) => {
    // Navigate to open voting page or implement logic
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">Historical Elections</h2>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {elections.length > 0 ? (
            elections.map((election) => (
              <HistoricalElectionCard
                
                key={election.id}
                electionId = {election.id}
                electionName={election.electionName}
                description={election.electionDescription}  
                noOfCandidates={election.parties.length}
                votingStartDate={new Date(election.startDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}  
                votingEndDate={new Date(election.endDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                status={election.status}
                onEdit={() => handleEdit(election.id)}
                onOpenVoting={() => handleOpenVoting(election.id)}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HistoricalElections;
