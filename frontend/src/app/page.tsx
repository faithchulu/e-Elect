"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";

interface Election {
  id: string;
  electionName: string;
  status: "registration" | "voting" | "closed";
}

const ElectionCard = ({ election }: { election: Election }) => {
  const getStatusIcon = (status: Election["status"]) => {
    switch (status) {
      case "registration":
        return <ClockIcon className="h-6 w-6 text-orange-500" />;
      case "voting":
        return <Link href={`/results/${election.id}`}> <CheckCircleIcon className="h-6 w-6 text-green-500" /></Link>;
      case "closed":
        return <ExclamationCircleIcon className="text-red-500 h-6 w-6" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Election["status"]) => {
    switch (status) {
      case "registration":
        return "Registration Open";
      case "voting":
        return "Voting in Progress";
      case "closed":
        return "Election Closed";
      default:
        return null;
    }
  };

  const getActionText = (status: Election["status"]) => {
    switch (status) {
      case "registration":
        return "Register to Vote";
      case "voting":
        return "Cast Your Vote";
      case "closed":
        return "View Results";
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg bg-slate-950 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{election.electionName}</h2>
        {getStatusIcon(election.status)}
      </div>
      <p className="text-gray-300 mt-2">{getStatusText(election.status)}</p>
      <Link
        href={
          election.status === "registration"
            ? `/voter-registration/${election.id}`
            : election.status === "voting"
              ? `/cast-vote/${election.id}`
              : `/results/${election.id}`
        }
        className="mt-4 block w-full rounded-md bg-green-600 py-2 text-center text-white hover:bg-green-500"
      >
        {getActionText(election.status)}
      </Link>
    </div>
  );
};

const LandingPage = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(
          "https://e-elect-backend.vercel.app/api/election/get-elections",
        );
        setElections(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch elections");
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  const activeElections = elections.filter(
    (election) =>
      election.status === "registration" || election.status === "voting",
  );
  const historicalElections = elections.filter(
    (election) => election.status === "closed",
  );

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
      <video
          src="/videos/zambiaflagvideo.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative z-10 min-h-screen py-24">
        <HorizontalNav />
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Currently Active Elections
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {activeElections.map((election) => (
                <ElectionCard key={election.id} election={election} />
              ))}
            </div>
          )}
          <h2 className="mb-4 mt-8 text-xl font-semibold text-white">
            Historical Elections
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {historicalElections.map((election) => (
                <ElectionCard key={election.id} election={election} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
