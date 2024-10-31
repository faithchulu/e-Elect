"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import AdminCards from "@/components/Cards/AdminCards";
import Piechart from "@/components/Charts/PieChart";

const AdminHome = () => {
  return (
    <DefaultLayout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold">Rgistered Voters</h2>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold">Active Voters</h2>
            <p className="text-2xl font-bold">987</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold">Potical Parties</h2>
            <p className="text-2xl font-bold">13</p>
          </div>
        </div>

      <AdminCards className=" shadow-lg"/>

      <div className="grid grid-cols-3">
        <div className='h-80 bg-white shadow-lg p-2 mt-4 col-span-1 rounded-md'>
          <Piechart/>
        </div>
        
        {/* Additional Information */}
        <div className="bg-white shadow-lg rounded-lg p-4 ml-4 mt-4 col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <ul className="list-disc pl-5">
              <li>Admin John Chisanga closed 2024 Local Government Election</li>
              <li>15 new voters registered today</li>
              <li>Admin Felix Feligo created an election</li>
              <li>Election results ready!</li>
            </ul>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminHome;
