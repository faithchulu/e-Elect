import { useState } from "react";
import axios from "axios";
import { PassageUser } from "@passageidentity/passage-node";
import { useRouter } from "next/router";

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

const registerUser = async (formData: FormDataType) => {
  // Initialize Passage user
  const passageUser = new PassageUser({
    appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
  });

  try {
    // Register user on Passage
    const passageResponse = await passageUser.create({
      phone: formData.phoneNumber, // Use phone number as identifier
    });

    if (passageResponse && passageResponse.user) {
      // Enable biometric login on Passage
      await passageUser.enableBiometrics(passageResponse.user.id);
    } else {
      throw new Error("Failed to register on Passage");
    }

    // Post user data to Firebase via your API
    const firebaseResponse = await axios.post(
      "http://localhost:4000/api/voter/register",
      formData
    );

    console.log("User registered on both Firebase and Passage.");
    return { success: true, passageUserId: passageResponse.user.id };
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: error.message };
  }
};

export default registerUser;
