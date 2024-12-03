"use client";
import { useState, useEffect } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import type { Voter } from "@/types/voter";  
import { useRouter, useParams } from "next/navigation";
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";

const SERVER_URL = "https://e-elect-fingerprint-backend.vercel.app";
const VOTER_API_URL = "https://e-elect-backend.vercel.app/api/voter";

const AuthPage = () => {
  const [nrcNumber, setNrcNumber] = useState("");
  const [voterId, setVoterId] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [voterData, setVoterData] = useState<Voter | null>(null); // Store voter data with type
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const voterId = Array.isArray(params?.voterId) ? params.voterId[0] : params?.voterId;
    if (voterId) {
      setVoterId(voterId); // `voterId` is now guaranteed to be a string
      fetchVoterData(voterId);
    }
  }, [params]);

  // Fetch voter data using voter ID
  const fetchVoterData = async (id: string) => {
    try {
      const response = await fetch(`${VOTER_API_URL}/get-voter-by-id/${id}`);
      if (response.ok) {
        const data: Voter = await response.json();
        setVoterData(data);
        setNrcNumber(data.nrcNumber); // Set NRC number from fetched data
      } else {
        const errorText = await response.text(); // Read non-JSON response as text
        console.error("Server Error:", errorText);
        showModal("Failed to fetch voter data. Please check the server.");
      }
    } catch (error: any) {
      console.error("Error fetching voter data:", error);
      showModal(`Error fetching voter data: ${error.message}`);
    }
  };

  const showModal = (text: string) => {
    setModalText(text);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRegistration = async () => {
    try {
      // Send NRC number and userId as part of the registration request
      const initResponse = await fetch(
        `${SERVER_URL}/api/scan/init-register?nrcNumber=${voterData?.nrcNumber}&userId=${voterData?.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nrcNumber: voterData?.nrcNumber,
            userId: voterData?.id,
          }),
        }
      );

      if (!initResponse.ok) {
        const error = await initResponse.json();
        showModal(error.message || "Failed to initialize registration");
        return;
      }

      const optionsJSON: PublicKeyCredentialCreationOptionsJSON = await initResponse.json();

      // Log the options to see what we're getting from the server
      console.log("Registration options from server:", optionsJSON);

      // Check if optionsJSON has required fields
      if (!optionsJSON.rp || !optionsJSON.rp.name) {
        showModal("Missing required RP name in options.");
        return;
      }

      let userName = "";
      if (voterData) {
        userName = voterData?.fullName || "";
      }

      if (!optionsJSON.user || !optionsJSON.user.name) {
        optionsJSON.user = {
          ...optionsJSON.user,
          name: userName || "Default User",
        };
      }

      // 2. Create passkey - pass options in correct format
      const registrationResponse = await startRegistration({ optionsJSON });

      // Log the registration response
      console.log("Registration response:", registrationResponse);

      // 3. Save passkey in DB
      const verifyResponse = await fetch(
        `${SERVER_URL}/api/scan/verify-register`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...registrationResponse,
            userId: voterData?.id,
            nrcNumber: voterData?.nrcNumber,
          }),
        },
      );

      const verifyData = await verifyResponse.json();
      if (!verifyResponse.ok) {
        showModal(verifyData.error || "Verification failed");
        return;
      }

      if (verifyData.verified) {
        showModal(`Fingerprint Successfully registered for NRC number: ${voterData?.nrcNumber}`);
        setTimeout(() => router.push("/"), 4000);
      } else {
        showModal("Failed to register");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      showModal(`Error during registration: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center">
      <HorizontalNav />
      <div className="w-80 rounded-lg bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">NRC Number</h2>
        <input
          type="text"
          placeholder="NRC Number"
          value={voterData?.nrcNumber}
          onChange={(e) => setNrcNumber(e.target.value)}
          className="border-gray-300 mb-4 w-full rounded border p-2 text-xl"
        />
        <button
          onClick={handleRegistration}
          className="w-full rounded bg-blue-500 py-2 text-xl text-white transition duration-200 hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {modalOpen && (
        <dialog
          open
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="w-80 rounded-lg bg-white p-6">
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
            >
              ×
            </button>
            <div className="mt-4 text-lg">{modalText}</div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AuthPage;
