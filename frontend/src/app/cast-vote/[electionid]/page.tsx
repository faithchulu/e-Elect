"use client"
import Image from "next/image";
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Candidateone from "../../../../public/images/candidates/HH.jpeg";
import Candidatetwo from "../../../../public/images/candidates/Nawakwi.jpeg";
import Candidatethree from "../../../../public/images/candidates/RB.jpeg";
import Candidatefour from "../../../../public/images/candidates/Ireen.jpeg";
import Candidatefive from "../../../../public/images/candidates/Sata.jpeg";
import { useParams } from 'next/navigation';
import { Party } from '@/types/party';

const CastVoteScreen = () => {
  const [candidates, setCandidates] = useState<Party[]>([]);
  const { electionid } = useParams();

  // Array of candidate images to be used
  const candidateImages = [Candidateone, Candidatetwo, Candidatethree, Candidatefour, Candidatefive];

  useEffect(() => {
    if (!electionid) return; // Prevent API call if electionId is not defined

    const fetchParties = async () => {
      try {
        const response = await axios.get(`https://e-elect-backend.vercel.app/api/party/get-parties-by-election/${electionid}`);
        console.log("API Response:", response.data);
        
        // Adjust this based on the actual response structure
        setCandidates(response.data.data); 
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    fetchParties();
  }, [electionid]);

  const handleVoteClick = (candidateId: string) => {
    console.log(`Vote casted for candidate with ID ${candidateId}`);
  };

  return (
    <div className="container mx-auto px-4 py-30">
      <HorizontalNav />
      <h1 className="text-2xl font-semibold text-black mb-4">Cast Your Vote</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {candidates.map((candidate, index) => (
          <div key={candidate.id} className="bg-white rounded-md shadow-md flex items-center border border-blue-700">
            <div className="flex-none w-24 h-24 rounded-l-md overflow-hidden">
              {/* Cycle through candidate images using the modulus operator */}
              <Image 
                src={candidateImages[index % candidateImages.length]} 
                alt={candidate.candidate} 
                width={96} 
                height={96} 
                className="w-auto h-fill object-cover" 
              />
            </div>
            <div className="flex-auto flex flex-col justify-center p-4 bg-green-700 ">
              <h2 className="text-lg text-white font-semibold">{candidate.candidate}</h2>
              <p className="text-white">{candidate.partyName}</p>
              <p className="mt-2 text-white">{candidate.slogan}</p>
              <Link
                href={`voter-auth/${electionid}/${candidate.id}`}
                className="flex-none bg-white text-black py-2 px-4 mt-2 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={() => handleVoteClick(candidate.id)}
              >
                Vote
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastVoteScreen;
