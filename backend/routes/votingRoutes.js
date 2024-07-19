const express = require("express");
const router = express.Router();
const votingService = require("../services/votingService");

// POST route for casting a vote
router.post("/cast-vote", async (req, res) => {
  try {
    const { electionId, partyId, nrcNumber } = req.body;

    if (!electionId || !partyId || !nrcNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await votingService.castVote(electionId, partyId, nrcNumber);

    if (result.success) {
      return res.status(200).json({ message: "Vote cast successfully" });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error casting vote:", error);
    res
      .status(500)
      .json({ message: "Error casting vote", error: error.message });
  }
});

module.exports = router;
