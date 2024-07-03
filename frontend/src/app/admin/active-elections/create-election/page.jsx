"use client"
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState } from 'react';

const CreateElection = () => {
  const [electionName, setElectionName] = useState('');
  const [politicalParty, setPoliticalParty] = useState('');
  const [partySlogan, setPartySlogan] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateImage, setCandidateImage] = useState(null);
  const [votingStartDate, setVotingStartDate] = useState('');
  const [votingEndDate, setVotingEndDate] = useState('');

  const handleImageChange = (e) => {
    setCandidateImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('electionName', electionName);
    formData.append('politicalParty', politicalParty);
    formData.append('partySlogan', partySlogan);
    formData.append('candidateName', candidateName);
    formData.append('candidateImage', candidateImage);
    formData.append('votingStartDate', votingStartDate);
    formData.append('votingEndDate', votingEndDate);

    // Example of sending data to the server
    // axios.post('your-api-endpoint', formData)
    //   .then(response => {
    //     // Handle success
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     // Handle error
    //     console.error(error);
    //   });
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto bg-white p-4">
        <h2 className="text-2xl font-bold mb-4">Create Election</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Election Name</label>
            <input
              type="text"
              value={electionName}
              onChange={(e) => setElectionName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Political Party</label>
            <input
              type="text"
              value={politicalParty}
              onChange={(e) => setPoliticalParty(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Party Slogan</label>
            <input
              type="text"
              value={partySlogan}
              onChange={(e) => setPartySlogan(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Candidate Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Candidate Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Voting Commencement Date</label>
            <input
              type="date"
              value={votingStartDate}
              onChange={(e) => setVotingStartDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Voting Close Date</label>
            <input
              type="date"
              value={votingEndDate}
              onChange={(e) => setVotingEndDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-meta-4 text-white p-2 rounded mt-2"
          >
            Create Election
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CreateElection;
