"use client";
import { useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import VoteBG from "../../../../public/images/backgrounds/vote-bg.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";

const VoterRegistrationForm = () => {
  const router = useRouter();
  // Define the state type to allow both null and File for nrcCopy
  type FormDataType = {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    nrcNumber: string;
    phoneNumber: string;
    residentialAddress: string;
    province: string;
    constituency: string;
  };

  // State variables to store form data
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nrcNumber: "",
    phoneNumber: "",
    residentialAddress: "",
    province: "",
    constituency: "",
  });

  // State variable to track current step of the form
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to handle input change
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/voter/register",
        formData,
      );

      localStorage.setItem("userDetails", JSON.stringify(response.data.voter));
      console.log(response);

      console.log("Voter registered successfully!");
      setSuccess("Voter registered successfully!");
      setLoading(false);

      setTimeout(() => router.push("/fingerprint-registration"), 4000);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
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
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Image
          src={VoteBG}
          alt="Vote Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-green-100 bg-opacity-90"></div>
      </div>
      <div className="relative z-10 min-h-screen px-4 py-30">
        <HorizontalNav />
        <div className="mx-auto mt-8 max-w-md rounded-lg border bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-black">
            Voter Registration Form
          </h2>

          {loading && <p className="text-blue-500">Submitting your registration...</p>}
          {success && <p className="text-green-500">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-green-600 p-1.5 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="dateOfBirth"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-green-600 p-1.5 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    required
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-green-600 p-1.5 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
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
                  <label
                    htmlFor="nrcNumber"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    NRC Number
                  </label>
                  <input
                    type="text"
                    id="nrcNumber"
                    name="nrcNumber"
                    value={formData.nrcNumber}
                    required
                    onChange={handleChange}
                    className="border-gray-300 mt-1 block w-full rounded-md p-1.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="border-gray-300 mt-1 block w-full rounded-md p-1.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="residentialAddress"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Residential Address
                  </label>
                  <textarea
                    id="residentialAddress"
                    name="residentialAddress"
                    rows={3}
                    value={formData.residentialAddress}
                    onChange={handleChange}
                    required
                    className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="province"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Province
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-green-600 p-1.5 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
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
                  <label
                    htmlFor="constituency"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Constituency
                  </label>
                  <select
                    id="constituency"
                    name="constituency"
                    value={formData.constituency}
                    required
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-green-600 p-1.5 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
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
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-gray-700 inline-flex items-center rounded-md border border-green-500 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <ChevronLeftIcon className="mr-2 h-5 w-5" />
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center rounded-md border border-green-600 bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Next
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={loading}
                >
                   {loading ? "Submitting..." : "Submit"}
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
