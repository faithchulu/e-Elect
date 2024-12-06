"use client";
import React from "react";
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import { PassageProvider, PassageAuth } from "@passageidentity/passage-react";

const AuthPage = () => {
  return (
    <div className="bg-gray-100 relative flex h-screen items-center justify-center">
      <HorizontalNav />
      <div className="absolute inset-0 flex items-center justify-center">
        <PassageProvider appId="egWtzxYJPi2WIqxHm7qr9dLp">
          <PassageAuth />
        </PassageProvider>
      </div>
    </div>
  );
};

export default AuthPage;
