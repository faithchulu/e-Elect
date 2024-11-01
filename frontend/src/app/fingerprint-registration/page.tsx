"use client";
import { useState, useEffect } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/atoms";
import { useRouter } from "next/navigation";

const SERVER_URL = "http://localhost:5000";

const AuthPage = () => {
  const [nrcNumber, setNrcNumber] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const user = useRecoilValue(userState);

  console.log("this is user", user);

  const router = useRouter();

  const showModal = (text: string) => {
    setModalText(text);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRegistration = async () => {
    try {
      const initResponse = await fetch(
        `${SERVER_URL}/api/scan/init-register?nrcNumber=${user?.nrcNumber}&userId=${user?.id}`,
        {
          credentials: "include",
        },
      );

      console.log(initResponse);

      if (!initResponse.ok) {
        const error = await initResponse.json();
        showModal(error.message || "Failed to initialize registration");
        return;
      }

      const optionsJSON: PublicKeyCredentialCreationOptionsJSON =
        await initResponse.json();

      // Log the options to see what we're getting from the server
      console.log("Registration options from server:", optionsJSON);

      // Check if optionsJSON has required fields
      if (!optionsJSON.rp || !optionsJSON.rp.name) {
        showModal("Missing required RP name in options.");
        return;
      }

      let userName = "";
      if (user) {
        userName = user?.fullName || "";
      }

      if (!optionsJSON.user || !optionsJSON.user.name) {
        optionsJSON.user = {
          ...optionsJSON.user,
          name: userName || "Default User",
        };
      }

      console.log("this is user", user);

      // 2. Create passkey - pass options in correct format
      const registrationResponse = await startRegistration(optionsJSON);

      // Log the registration response
      console.log("Registration response:", registrationResponse);

      const userId = user?.id;
      const nrcNumber = user?.nrcNumber;

      // 3. Save passkey in DB
      const verifyResponse = await fetch(
        `${SERVER_URL}/api/scan/verify-register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...registrationResponse, userId, nrcNumber }),
        },
      );

      const verifyData = await verifyResponse.json();
      if (!verifyResponse.ok) {
        showModal(verifyData.error || "Verification failed");
        return;
      }

      if (verifyData.verified) {
        showModal(`Successfully registered NRC number: ${nrcNumber}`);
        setTimeout(() => router.push("/fingerprint-registration"), 4000);
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
      <div className="w-80 rounded-lg bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">NRC Number</h2>
        <input
          type="text"
          placeholder="NRC Number"
          value={user?.nrcNumber}
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
