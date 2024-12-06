import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const CastVotePage = () => {
  const [nrcNumber, setNrcNumber] = useState("");
  const router = useRouter();

  const handleNrcNumberSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("nrcNumber", nrcNumber); // Save NRC number in localStorage
    router.push(`/cast-vote/scan`); // Navigate to Step 2
  };

  return (
    <div>
      <h1>Step 1: Enter NRC Number</h1>
      <form onSubmit={handleNrcNumberSubmit}>
        <input
          type="text"
          value={nrcNumber}
          onChange={(e) => setNrcNumber(e.target.value)}
          placeholder="Enter NRC Number"
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default CastVotePage;
