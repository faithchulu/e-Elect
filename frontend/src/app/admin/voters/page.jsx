"use client"
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import VoterTable from "@/components/Tables/VoterTable";

const Voters = () => {
  return (
    <DefaultLayout>   
      <VoterTable/>
    </DefaultLayout>
  );
};

export default Voters;
