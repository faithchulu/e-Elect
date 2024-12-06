"use client";
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import { useState, useEffect, useCallback } from "react";
import { FingerPrintIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Sucess from "@/components/Alerts/Sucess";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { optionsState, userState } from "@/app/atoms/atoms";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

const SERVER_URL = "https://e-elect-backend.vercel.app";

const VoterAuthForm = () => {
  const [step, setStep] = useState(1);
  const [nrcNumber, setNrcNumber] = useState("");
  const [fingerprintScanned, setFingerprintScanned] = useState(false);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const { electionid, candidateid } = useParams();
  const [candidateName, setCandidateName] = useState("");
  const [politicalParty, setPoliticalParty] = useState("");
  const user = useRecoilValue(userState);
  const [modalText, setModalText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const setOptions = useSetRecoilState(optionsState);
  const optionsData = useRecoilValue(optionsState);
  const [loading, setLoading] = useState(false);

  // Fetch party data by candidateId
  useEffect(() => {
    const fetchPartyData = async () => {
      try {
        const response = await axios.get(
          `https://e-elect-backend.vercel.app/api/party/get-party/${candidateid}`,
        );
        const partyData = response.data;
        setCandidateName(partyData.candidate);
        setPoliticalParty(partyData.partyName);
      } catch (error) {
        console.error("Error fetching party data:", error);
      }
    };

    if (candidateid) {
      fetchPartyData();
    }
  }, [candidateid]);

  // Add event listener for postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin for security
      if (event.origin !== "http://localhost:3000") return;

      if (event.data === "authentication_success") {
        // Close the modal
        setModalOpen(false);

        // Move to step 3
        setStep(3);
        setFingerprintScanned(true);
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Submit NRC number and move to the next step
  const handleNrcNumberSubmit = (e: any) => {
    e.preventDefault();
    setStep(2);
  };

  const showModal = (text: any) => {
    setModalText(text);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Request fingerprint scan from the server
  const requestFingerprintScan = async () => {
    setLoading(true);
    try {
      console.log(`Frontend nrc: ${nrcNumber}`);
      // Step 1: Initialize fingerprint authentication and retrieve options
      const response = await axios.get(
        `${SERVER_URL}/api/scan/init-auth?nrcNumber=${nrcNumber}`,
      );

      console.log("API Response:", response.data);

      const options = response.data;
      setOptions(options);

      const optionsJSON = response.data.options;

      const authJSON = await startAuthentication({ optionsJSON });

      console.log("this is authJson", authJSON);
      console.log("this is my goal to get the public key", options.voter);

      const creds = options.voter;

      let credentialId;

      // Step 2: Use the passkey to respond to the authentication challenge
      if (options.options && options.options.allowCredentials) {
        const credential = options.options.allowCredentials[0];
        console.log("these are allowed creds", credential);
        console.log("this is your counter", options.voter.counter);
        credentialId = credential.id;
        console.log("Selected Credential ID:", credentialId);
      } else {
        console.log("No allowCredentials found.");
      }

      // Step 3: Send the authentication response back to the server for verification
      const verifyResponse = await fetch(`${SERVER_URL}/api/scan/verify-auth`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...options,
          optionsData: optionsData,
          credentialId: options.voter.credentialID,
          publicKey: options.voter.publicKey,
          transport: options.voter.transports,
          counter: options.voter.counter,
          auth: authJSON,
        }),
      });

      const verifyData = await verifyResponse.json();
      if (!verifyResponse.ok) {
        throw new Error(verifyData.error);
      }

      console.log("this is valid data", verifyData);

      // Handle the verification result
      if (verifyData.verified) {
        showModal(`Successfully logged in ${nrcNumber}`);
        setFingerprintScanned(true);
        setStep(3);
      } else {
        showModal(`Failed to log in`);
      }
    } catch (error) {
      console.log("this is response", error);
      console.error("Error during fingerprint scan:", error);
      showModal("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFingerprintScan = () => {
    setModalOpen(true);
    // Optional: Trigger scan process
    // requestFingerprintScan();
  };

  // Handle vote confirmation and send a POST request to cast the vote
  const handleConfirm = async (confirm: unknown) => {
    if (confirm) {
      try {
        await axios.post(`${SERVER_URL}/api/vote/cast-vote`, {
          electionId: electionid,
          partyId: candidateid,
          nrcNumber,
          voterAddress: "0x4C0B4D58285a78B14DA4d6D8B73ff335257b71d5",
        });

        setVoteConfirmed(true);
      } catch (error) {
        console.error("Error casting vote:", error);
      }
    } else {
      setStep(1);
    }
  };

  // Redirect to results page after vote confirmation
  useEffect(() => {
    if (voteConfirmed) {
      const timer = setTimeout(() => {
        window.location.href = `/results/${electionid}`;
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [voteConfirmed, electionid]);

  return (
    <div className="py-30">
      <HorizontalNav />
      <Link
        href={`/cast-vote/${electionid}`}
        className="ml-4 inline-flex items-center justify-center rounded-md bg-black px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Back
      </Link>
      {voteConfirmed && (
        <div className="absolute inset-0 z-50 flex min-h-screen items-center justify-center bg-black bg-opacity-75">
          <Sucess candidateName={candidateName} partyName={politicalParty} />
        </div>
      )}
      <div className="relative mx-auto mt-8 max-w-md rounded-lg border bg-white p-6 shadow-lg">
        {step === 1 && (
          <form onSubmit={handleNrcNumberSubmit}>
            <h1 className="mb-4 text-2xl font-semibold text-black">
              Step 1: Enter NRC Number
            </h1>
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
                className="mt-1 w-full rounded-md border border-green-500 p-2"
                value={nrcNumber}
                onChange={(e) => setNrcNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>
          </form>
        )}
        {step === 2 && (
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-2xl font-semibold text-black">
              Step 2: Scan Fingerprint
            </h1>
            <FingerPrintIcon className="h-20" />
            <p className="mb-4">
              Please place your finger on the fingerprint scanner for
              authentication.
            </p>
            <button
              onClick={requestFingerprintScan}
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Scan Fingerprint
            </button>
          </div>
        )}
        {step === 3 && fingerprintScanned && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-lg text-green-600">
              Fingerprint scanned successfully. Please confirm your vote.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => handleConfirm(true)}
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Confirm Vote
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="bg-red-500 hover:bg-red-600 focus:ring-red-500 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Passage Modal */}
      {modalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="flex w-[550px] flex-col rounded-lg bg-white p-4">
            <iframe
              src={`http://localhost:3000/passage`}
              width="500"
              height="500"
              title="Passage Authentication"
              className="border-gray-300 mb-4 border-2"
            />
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setStep(2);
                }}
                className="bg-red-500 hover:bg-red-600 flex-1 rounded px-4 py-2 text-white transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setStep(3);
                  setFingerprintScanned(true);
                }}
                className="flex-1 rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              >
                Proceed to Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterAuthForm;
