"use client"
import Image from "next/image";
import Candidateone from "../../../../public/images/candidates/candidate1.jpg"
import Candidatetwo from "../../../../public/images/candidates/candidate2.jpg"
import Candidatethree from "../../../../public/images/candidates/CandidateThree.jpg"
import Candidatefour from "../../../../public/images/candidates/CandidateFour.jpg"
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import Link from "next/link";

const candidates = [
  {
    id: "1",
    name: 'John Doe',
    party: 'Unity Party',
    slogan: 'Together we thrive',
    image: Candidateone, 
  },
  {
    id: "2",
    name: 'Jane Smith',
    party: 'Progressive Alliance',
    slogan: 'Moving forward, together',
    image: Candidatetwo, 
  },
  {
  id: "3",
  name: 'John Doe',
  party: 'Unity Party',
  slogan: 'Together we thrive',
  image: Candidatethree, 
},
{
  id: "4",
  name: 'Jane Smith',
  party: 'Progressive Alliance',
  slogan: 'Moving forward, together',
  image: Candidatefour, 
},
  // Add more candidate objects as needed
];

const CastVoteScreen = ({params}:{params :{candidateId : string}}) => {
  const handleVoteClick = (candidateId : string ) => {
    // Implement logic to handle voting for the candidate with the given ID
    console.log(`Vote casted for candidate with ID ${candidateId}`);
  };

  return (
    <div className="container mx-auto px-4 py-30">
      <HorizontalNav />
      <h1 className="text-2xl font-semibold text-black mb-4">Cast Your Vote</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-md shadow-md flex items-center border border-blue-700">
            <div className="flex-none w-24 h-24 rounded-l-md overflow-hidden">
              <Image src={candidate.image} alt={candidate.name} className="w-auto h-fill object-cover" />
            </div>
            <div className="flex-auto flex flex-col justify-center p-4 bg-green-700 ">
              <h2 className="text-lg text-white font-semibold">{candidate.name}</h2>
              <p className="text-white">{candidate.party}</p>
              <p className="mt-2 text-white">{candidate.slogan}</p>
              <Link
              href="voter-auth/id"
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
