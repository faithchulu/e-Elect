import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ConfirmVotePage = () => {
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [candidateName, setCandidateName] = useState("John Doe");
  const [politicalParty, setPoliticalParty] = useState("Sample Party");
  const nrcNumber = localStorage.getItem("nrcNumber");
  const router = useRouter();

  const handleConfirm = async (confirm: boolean) => {
    if (confirm) {
      try {
        await axios.post(
          `https://e-elect-backend.vercel.app/api/vote/cast-vote`,
          {
            nrcNumber,
            partyId: "candidateid", // This should be dynamic
          },
        );
        setVoteConfirmed(true);
      } catch (error) {
        console.error("Error confirming vote:", error);
      }
    } else {
      router.push(`/cast-vote/scan`); // Go back to fingerprint scan
    }
  };

  if (voteConfirmed) {
    setTimeout(() => {
      router.push(`/results/${"electionid"}`); // Navigate to the results page after success
    }, 3000);
  }

  return (
    <div>
      <h1>Step 3: Confirm Your Vote</h1>
      <p>
        Are you sure you want to vote for <strong>{candidateName}</strong> of{" "}
        <strong>{politicalParty}</strong>?
      </p>
      <button onClick={() => handleConfirm(true)}>Yes, Im Sure</button>
      <button onClick={() => handleConfirm(false)}>No, Cancel</button>
    </div>
  );
};

export default ConfirmVotePage;
