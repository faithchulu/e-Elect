import { useEffect, useState } from "react";
import axios from "axios";
import { Voter } from "@/types/voter";
import { TrashIcon } from "@heroicons/react/24/outline";

const VoterTable = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const votersPerPage = 30;

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get("https://e-elect-backend.vercel.app/api/voter/get-voters");
        setVoters(response.data);
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };

    fetchVoters();
  }, []);

  // Delete voter by ID
  const deleteVoter = async (voterId: string) => {
    try {
      await axios.delete(`https://e-elect-backend.vercel.app/api/voter/delete-voter/${voterId}`);
      setVoters(voters.filter(voter => voter.id !== voterId)); // Update state to remove the deleted voter
    } catch (error) {
      console.error("Error deleting voter:", error);
    }
  };

  // Pagination logic
  const indexOfLastVoter = currentPage * votersPerPage;
  const indexOfFirstVoter = indexOfLastVoter - votersPerPage;
  const currentVoters = voters.slice(indexOfFirstVoter, indexOfLastVoter);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">Registered Voters</h4>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Full Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">NRC Number</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">D.O.B</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Gender</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Address</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Province</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Constituency</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p> {/* New Header for Actions */}
        </div>
      </div>

      {/* Table Data */}
      {currentVoters.map((voter) => (
        <div
          className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
          key={voter.id} // Use voter.id instead of key
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.fullName}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.nrcNumber}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.dateOfBirth}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.phoneNumber}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.gender}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.residentialAddress}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.province}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{voter.constituency}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <button onClick={() => deleteVoter(voter.id)} className="text-meta-1">
              <TrashIcon className="w-4 h-4"/>
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(voters.length / votersPerPage) }, (_, page) => (
          <button
            key={page}
            onClick={() => paginate(page + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VoterTable;
