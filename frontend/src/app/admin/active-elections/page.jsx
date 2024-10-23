"use client";
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ElectionCard from '@/components/Cards/ElectionCard'; // Adjust the import path as necessary
import BASE_URL from "@/config/index";
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ActiveElections = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        
        const response = await axios.get(`http://localhost:4000/api/election/active-elections`);
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
          <h2 className="text-2xl font-bold mb-4">Active Elections</h2>
          <Link href="/admin/active-elections/create-election" className="flex bg-meta-4 rounded-md shadow-lg px-2 py-1.5 text-white">
            <PlusCircleIcon className='h-6 w-6'/>
            New Election
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {elections.length > 0 ? (
            elections.map((election) => (
              <ElectionCard
                
                key={election.id}
                electionName={election.name}
                description={election.description}  
                noOfCandidates={election.noOfCandidates}
                votingStartDate={new Date(election.votingStartDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}  
                votingEndDate={new Date(election.votingEndDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
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
