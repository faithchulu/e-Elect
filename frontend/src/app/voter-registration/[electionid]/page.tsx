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
import { useSetRecoilState } from "recoil";
import { userState } from "@/app/atoms/atoms";

// Define the province type
type Province =
  | "central"
  | "copperbelt"
  | "eastern"
  | "luapula"
  | "lusaka"
  | "muchinga"
  | "northern"
  | "northWestern"
  | "southern"
  | "western";

// Define the mapping of provinces to constituencies
const constituenciesByProvince: Record<Province, string[]> = {
  central: ["Bwacha", "Chisamba", "Chitambo", "Itezhi-Tezhi"],
  copperbelt: ["Bwana Mkubwa", "Chifubu", "Chililabombwe", "Chimwemwe"],
  eastern: ["Chadiza", "Chasefu", "Chipangali", "Chipata Central"],
  luapula: ["Bahati", "Bangweulu", "Chembe", "Chienge"],
  lusaka: ["Chawama", "Chilanga", "Chirundu", "Chongwe"],
  muchinga: ["Chama North", "Chama South", "Chinsali", "Isoka"],
  northern: ["Chilubi", "Chimbamilonga", "Kaputa", "Kasama"],
  northWestern: ["Chavuma", "Ikeleng'i", "Kabompo", "Kasempa"],
  southern: ["Bweengwa", "Chikankata", "Choma", "Dundumwenzi"],
  western: ["Kalabo Central", "Kaoma", "Liuwa", "Luampa"],
};

const VoterRegistrationForm = () => {
  const router = useRouter();
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

  const [filteredConstituencies, setFilteredConstituencies] = useState<
    string[]
  >([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const setUserDetails = useSetRecoilState(userState);

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

    // Update constituencies when province is selected
    if (name === "province") {
      setFilteredConstituencies(
        constituenciesByProvince[value as Province] || [],
      );
      setFormData((prevData) => ({ ...prevData, constituency: "" })); // Reset constituency
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://e-elect-backend.vercel.app/api/voter/register",
        formData,
      );

      const voterData = response.data.voter.data;
      setUserDetails(voterData); // Save data to recoil state
      console.log(voterData);

      console.log("Voter registered successfully!");
      setSuccess("Voter registered successfully!");
      setLoading(false);
      setTimeout(() => router.push(`/fingerprint-registration/${voterData.id}`), 2000);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

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

          {loading && (
            <p className="text-blue-500">Submitting your registration...</p>
          )}
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
                    {Object.keys(constituenciesByProvince).map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
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
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-green-600 p-1.5 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">Select Constituency</option>
                    {filteredConstituencies.map((constituency) => (
                      <option key={constituency} value={constituency}>
                        {constituency}
                      </option>
                    ))}
                  </select>
                </div>
              </>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoterRegistrationForm;
