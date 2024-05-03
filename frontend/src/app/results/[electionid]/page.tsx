"use client"
import HorizontalNav from '@/components/HorizontalNav/HorizontalNav';
import React from 'react';

const ResultsPage = () => {
  // Mock data for demonstration
  const resultsData = [
    { candidate: 'John Doe', percentage: 58.67, votes: 56783 },
    { candidate: 'Jane Smith', percentage: 30.25, votes: 29345 },
    { candidate: 'Michael Johnson', percentage: 11.08, votes: 10784 },
  ];

  const totalVotes = resultsData.reduce((total, candidate) => total + candidate.votes, 0);

  return (
    <div className=" px-4 py-30">
      <HorizontalNav/>
      <h1 className="text-2xl text-black font-semibold mb-4">Election title Results</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {resultsData.map((candidateData, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold">{candidateData.candidate}</h2>
            <div className="relative bg-gray-200 rounded-full h-8 mt-2">
              <div
                className="absolute top-0 left-0 bg-green-500 rounded-full h-4"
                style={{ width: `${candidateData.percentage}%` }}
              ></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 right-4 text-sm text-gray-700">
                {`${candidateData.percentage.toFixed(2)}% (${candidateData.votes.toLocaleString()} votes)`}
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 ">
          <hr className='border-gray-700 mb-4'></hr>
          <p className="text-lg font-semibold">Total Votes Cast:</p>
          <p className="text-xl">{totalVotes.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
