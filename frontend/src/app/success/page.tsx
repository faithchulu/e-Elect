"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";

const AuthPage = () => {
  const [isRegistered, setIsRegistered] = useState(false); // State to track success
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Set the state to true when login is successful
    setIsRegistered(true);

    // Optionally, redirect to another page after registration
    // router.push('/success');
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center">
      <HorizontalNav />

      <div className="mt-4 text-lg font-semibold text-green-500">
        Successfully! 🎉
      </div>
    </div>
  );
};

export default AuthPage;
