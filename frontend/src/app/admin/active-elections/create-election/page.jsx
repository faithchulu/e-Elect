"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const questionsList = [
  "Enter the Election Name",
  "Enter the Election Description",
  "Select the election type",
  "Voting Start Date",
  "Voting End Date",
  "Select Participating parties"
];

const CreateElection = () => {
  const [step, setStep] = useState(0);
  const [electionName, setElectionName] = useState("");
  const [electionDescription, setElectionDescription] = useState("");
  const [electionType, setElectionType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participatingParties, setParticipatingParties] = useState([]);
  const [parties, setParties] = useState([]);



  useEffect(() => {
    // Fetch parties from the database
    const fetchParties = async () => {
      try {
        const response = await axios.get('https://e-elect-backend.vercel.app/api/party/get-parties'); 
        setParties(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };

    fetchParties();
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePartyChange = (partyId) => {
    setParticipatingParties((prevParties) => {
      const isSelected = prevParties.includes(partyId);
      const newSelectedParties = isSelected
        ? prevParties.filter((id) => id !== partyId)
        : [...prevParties, partyId];
      return newSelectedParties;
    });
  };

  const handleSubmit = async () => {
    const electionData = {
      electionName,
      electionDescription,
      "type": electionType,
      startDate,
      endDate,
      parties: participatingParties,
      status : "registration"
    };

    console.log(electionData)

    try {
      await axios.post('https://e-elect-backend.vercel.app/api/election/create', electionData); // Adjust the endpoint as necessary
      alert('Election created successfully!');
      window.location.href = "/admin/active-elections"
    } catch (error) {
      console.error('Error creating election:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="bg-black  font-bold p-5 rounded-md py-30 w-3/4">
            <div className='flex flex-col items-center'> 
              <label htmlFor="electionName" className="text-white text-xl mb-4">
                {questionsList[step]}
              </label>
              <input
                type="text"
                id="electionName"
                className='mb-2'
                value={electionName}
                required
                onChange={(e) => setElectionName(e.target.value)}
              />
              <button className="py-1.5 bg-green-500 text-white mt-6 rounded-md px-4" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="bg-black font-bold p-5 rounded-md py-30 w-3/4">
            <div className='flex flex-col items-center'> 
              <label htmlFor="electionDescription" className="text-white text-xl mb-4">
                {questionsList[step]}
              </label>
              <input
                type="text"
                id="electionDescription"
                className='mb-2'
                value={electionDescription}
                onChange={(e) => setElectionDescription(e.target.value)}
              />
              <div className='flex mt-6'>
                <button className="p-2 border border-green-500 text-white rounded-md mr-4" onClick={prevStep}>Previous</button>
                <button className="p-2 bg-green-500 text-white  rounded-md" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-black  font-bold p-5 rounded-md py-30 w-3/4">
            <div className='flex flex-col items-center'> 
              <label htmlFor="electionType" className="text-white text-xl mb-4">
                {questionsList[step]}
              </label>
              <select
                type="text"
                id="electionType"
                className='mb-2'
                value={electionType}
                required
                onChange={(e) => setElectionType(e.target.value)}
              >
                    <option value="">Select Type</option>
                    <option value="Presidential">Presidential</option>
                    <option value="Local Government">Local Government</option>
                    <option value="Parliamentary">Parliamentary</option>
              </select>
              <div className='flex mt-6'>
                <button className="p-2 border border-green-500 text-white rounded-md mr-4" onClick={prevStep}>Previous</button>
                <button className="p-2 rounded-md bg-green-500 text-white" onClick={nextStep}>Next</button>
              </div>
              </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-black  font-bold p-5 rounded-md py-30 w-3/4">
            <div className='flex flex-col items-center'> 
              <label htmlFor="startDate" className="text-white text-2xl mb-2">
                {questionsList[step]}
              </label>
              <input
                type="datetime-local"
                id="startDate"
                className='mb-2'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div className='flex mt-6'>
                <button className="p-2 border border-green-500 text-white rounded-md mr-4" onClick={prevStep}>Previous</button>
                <button className="p-2 rounded-md bg-green-500 text-white" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-black font-bold p-5 rounded-md py-30 w-3/4">
            <div className='flex flex-col items-center'> 
              <label htmlFor="endDate" className="text-white text-2xl mb-2">
                {questionsList[step]}
              </label>
              <input
                type="datetime-local"
                id="endDate"
                className='mb-2'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className='flex mt-6'>
                <button className="p-2 border border-green-500 text-white rounded-md mr-4 " onClick={prevStep}>Previous</button>
                <button className="p-2 rounded-md bg-green-500 text-white" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        );
        case 5:
          return (
            <div className="bg-black font-bold p-5 rounded-md py-30 w-3/4">
              <div className='flex flex-col items-center'> 
                <label htmlFor="parties" className="text-white text-2xl mb-2">
                  {questionsList[step]}
                </label>
                {parties.map((party) => (
                  <div key={party.id} className="mb-2">
                    <input
                      type="checkbox"
                      id={party.id}
                      checked={participatingParties.includes(party.id)}
                      onChange={() => handlePartyChange(party.id)}
                    />
                    <label htmlFor={party.id} className="text-white ml-2">{party.partyName}</label>
                  </div>
                ))}
                <div className='flex mt-6'>
                  <button className="p-2 border border-green-500 text-white rounded-md mr-4" onClick={prevStep}>Previous</button>
                  <button className="p-2 rounded-md bg-green-500 text-white" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col min-h-screen space-y-4 bg-cover bg-center">
        {/* Top navigation section */}
        {step >= 0 && (
          <div className="w-6 h-6  text-green ">
            <ArrowLeftIcon onClick={prevStep} />
          </div>
        )}

        <div className="w-full flex justify-center items-center ">
          {/* Progress bar */}
          <div className="h-1 bg-slate-300 w-2/3 relative">
            <div className="h-1 bg-green-500" style={{ width: `${(step / questionsList.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="absolute top-0 right-0 m-4">
          {step + 1}/{questionsList.length}
        </div>

        {/* Main Content */}
        {step === questionsList.length ? (
          <div className="text-center">
            <h1 className='font-bold my-4'>Election data collected successfully!</h1>
            
            <Link href='/admin/active-elections'>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4">
                Go to Active Elections
              </button>
            </Link>
          </div>
        ) : (
          <div className="text-center w-full flex flex-col items-center">
            {renderStepContent()}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CreateElection;
