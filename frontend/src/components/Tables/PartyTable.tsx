import { useEffect, useState } from "react";
import axios from "axios";
import { Party } from "@/types/party"; // Import the Party type
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

const PartyTable = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const partiesPerPage = 30;

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/party/get-parties");
        setParties(response.data);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    fetchParties();
  }, []);

  // Pagination logic
  const indexOfLastParty = currentPage * partiesPerPage;
  const indexOfFirstParty = indexOfLastParty - partiesPerPage;
  const currentParties = parties.slice(indexOfFirstParty, indexOfLastParty);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (id: string) => {
    // Logic for editing the party
    console.log(`Edit party with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Logic for deleting the party
    console.log(`Delete party with ID: ${id}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className='flex justify-between'>
          <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">Registered Parties</h4>
          </div>
          <Link href="/admin/political-parties/create-party" className="flex bg-meta-4 rounded-md mt-4 mb-4 mr-4 shadow-lg px-2 py-1.5 text-white">
            <PlusCircleIcon className='h-6 w-6'/>
            New Party
          </Link>
        </div>

      {/* Table Headers */}
      <div className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Party Name</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Candidate</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Slogan</p>
        </div>
        <div className="col-span-1 flex items-center"></div> {/* Empty header for icons */}
      </div>

      {/* Table Data */}
      {currentParties.map((party) => (
        <div
          className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
          key={party.id}
        >
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{party.partyName}</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="text-sm text-black dark:text-white">{party.candidate}</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="text-sm text-black dark:text-white">{party.slogan}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <button onClick={() => handleEdit(party.id)} className="text-blue-500 hover:text-blue-700">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button onClick={() => handleDelete(party.id)} className="text-meta-1 hover:text-red-700 ml-2">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(parties.length / partiesPerPage) }, (_, page) => (
          <button
            key={page}
            onClick={() => paginate(page + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PartyTable;
