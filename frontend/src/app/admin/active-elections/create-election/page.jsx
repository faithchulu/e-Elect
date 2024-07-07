"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";

const CreateElection = () => {
  const [electionName, setElectionName] = useState("");
  const [politicalParty, setPoliticalParty] = useState("");
  const [partySlogan, setPartySlogan] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateImage, setCandidateImage] = useState(null);
  const [votingStartDate, setVotingStartDate] = useState("");
  const [votingEndDate, setVotingEndDate] = useState("");

  const handleImageChange = (e) => {
    setCandidateImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("electionName", electionName);
    formData.append("politicalParty", politicalParty);
    formData.append("partySlogan", partySlogan);
    formData.append("candidateName", candidateName);
    formData.append("candidateImage", candidateImage);
    formData.append("votingStartDate", votingStartDate);
    formData.append("votingEndDate", votingEndDate);

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
        <h2 className="mb-4 text-2xl font-bold">Create Election</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 block">Election Name</label>
            <input
              type="text"
              value={electionName}
              onChange={(e) => setElectionName(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Political Party</label>
            <input
              type="text"
              value={politicalParty}
              onChange={(e) => setPoliticalParty(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Party Slogan</label>
            <input
              type="text"
              value={partySlogan}
              onChange={(e) => setPartySlogan(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Candidate Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Candidate Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border-gray-300 mt-1 block w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">
              Voting Commencement Date
            </label>
            <input
              type="date"
              value={votingStartDate}
              onChange={(e) => setVotingStartDate(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Voting Close Date</label>
            <input
              type="date"
              value={votingEndDate}
              onChange={(e) => setVotingEndDate(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded border p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded bg-meta-4 p-2 text-white"
          >
            Create Election
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CreateElection;
