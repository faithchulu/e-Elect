"use client"
import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
import Logo from '../../../../public/images/logo/e-Elect-Logo.png'
import Image from 'next/image';
import HorizontalNav from '@/components/HorizontalNav/HorizontalNav';
import VoteBG from '../../../../public/images/backgrounds/vote-bg.jpg'

const VoterRegistrationForm = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nrcNumber: '',
    nrcCopy: null,
    phoneNumber: '',
    address: '',
    province: '',
    constituency: '',
  });

  // State variable to track current step of the form
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setFormData((prevData) => ({
      //   ...prevData,
      //   nrcCopy: file,
      // }));
    }
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    window.location.href = '/';
    console.log(formData); // For demonstration, log form data to console
  };

  // Function to move to the next step
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to move to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="bg-[url('/images/backgrounds/vote-bg.jpg')] bg-no-repeat bg-cover min-h-screen">

    <div className="bg-green-100 bg-opacity-90 min-h-screen py-30 px-4">

      <HorizontalNav/>
      
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white ">
      <h2 className="text-xl font-semibold mb-4 text-black">Voter Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 p-1.5 block w-full rounded-md border-green-600 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="mt-1  p-1.5 block w-full rounded-md border-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"  />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="mt-1  p-1.5 block w-full rounded-md border-green-600 shadow-sm focus:border-green-500 focus:ring-green-500" >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="mb-4">
              <label htmlFor="nrcNumber" className="block text-sm font-medium text-gray-700">NRC Number</label>
              <input type="text" id="nrcNumber" name="nrcNumber" value={formData.nrcNumber} onChange={handleChange} className="mt-1 p-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"  />
            </div>
            <div className="mb-4">
              <label htmlFor="nrcCopy" className="block text-sm font-medium text-gray-700">Upload Copy of NRC</label>
              <div className="mt-1 flex items-center">
                <input type="file" id="nrcCopy" onChange={handleFileUpload} className="hidden" />
                <label htmlFor="nrcCopy" className="cursor-pointer flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <DocumentPlusIcon className="w-5 h-5 mr-2" />
                  Choose File
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 p-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"  />
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Residential Address</label>
              <textarea id="address" name="address" rows={3} value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
              <select id="province" name="province" value={formData.province} onChange={handleChange} className="mt-1  p-1.5 block w-full rounded-md border-green-600 shadow-sm focus:border-green-500 focus:ring-green-500" >
                <option value="">Select Province</option>
                <option value="lusaka">Lusaka</option>
                <option value="copperbelt">Copperbelt</option>
                <option value="Northern">Northern</option>
                <option value="Southern">Southern</option>
                <option value="Eastern">Eastern</option>
                <option value="Western">Western</option>
                <option value="Muchinga">Muchinga</option>
                <option value="Luapula">Luapula</option>
                <option value="NorthWestern">North Western</option>
                <option value="central">Central</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="constituency" className="block text-sm font-medium text-gray-700">Constituency</label>
              <select id="constituency" name="constituency" value={formData.constituency} onChange={handleChange} className="mt-1  p-1.5 block w-full rounded-md border-green-600 shadow-sm focus:border-green-500 focus:ring-green-500" >
                <option value="">Select constituency</option>
                <option value="lusaka">Lusaka</option>
                <option value="copperbelt">Copperbelt</option>
                <option value="Northern">Northern</option>
                <option value="Southern">Southern</option>
                <option value="Eastern">Eastern</option>
                <option value="Western">Western</option>
                <option value="Muchinga">Muchinga</option>
                <option value="Luapula">Luapula</option>
                <option value="NorthWestern">North Western</option>
                <option value="central">Central</option>
              </select>
            </div>
          </>
        )}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="inline-flex items-center px-4 py-2 border border-green-500 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button type="button" onClick={nextStep} className="inline-flex items-center px-4 py-2 border border-green-600 rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Next
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
  </div>

  );
};

export default VoterRegistrationForm;
