"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const questionsList = [
  "Enter the Party Name",
  "Enter the party slogan",
  "Enter the candidate name"
];

const CreateParty = () => {
  const [step, setStep] = useState(0);
  const [partyName, setPartyName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [candidate, setCandidate] = useState("");


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const partyData = {
      partyName,
      slogan,
      candidate,
      
    };

    console.log(partyData)

    try {
      await axios.post('https://e-elect-backend.vercel.app/api/party/create', partyData); // Adjust the endpoint as necessary
      alert('Party created successfully!');
      window.location.href = "/admin/political-parties"
    } catch (error) {
      console.error('Error creating party:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="bg-black  font-bold p-5 rounded-md py-30 w-3/4">
            <div className='flex flex-col items-center'> 
              <label htmlFor="partyName" className="text-white text-xl mb-4">
                {questionsList[step]}
              </label>
              <input
                type="text"
                id="partyName"
                className='mb-2'
                value={partyName}
                required
                onChange={(e) => setPartyName(e.target.value)}
              />
              <button className="py-1.5 bg-green-500 text-white mt-6 rounded-md px-4" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="bg-black font-bold p-5 rounded-md py-30 w-3/4">
            <div className='flex flex-col items-center'> 
              <label htmlFor="slogan" className="text-white text-xl mb-4">
                {questionsList[step]}
              </label>
              <input
                type="text"
                id="slogan"
                className='mb-2'
                value={slogan}
                required
                onChange={(e) => setSlogan(e.target.value)}
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
            <div className="bg-black font-bold p-5 rounded-md py-30 w-3/4">
              <div className='flex flex-col items-center'> 
                <label htmlFor="candidate" className="text-white text-xl mb-4">
                  {questionsList[step]}
                </label>
                <input
                  type="text"
                  id="candidate"
                  className='mb-2'
                  required
                  value={candidate}
                  onChange={(e) => setCandidate(e.target.value)}
                />
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
            <h1 className='font-bold my-4'>Party data collected successfully!</h1>
            
            <Link href='/admin/political-parties'>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4">
                Go to parties
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

export default CreateParty;
