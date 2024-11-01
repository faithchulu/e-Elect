const express = require("express");
const router = express.Router();
const votingService = require("../services/votingService");

router.post("/cast-vote", async (req, res) => {
  const { electionId, partyId, nrcNumber, voterAddress } = req.body;
  const result = await votingService.castVote(electionId, partyId, nrcNumber, voterAddress);
  res.status(result.success ? 200 : 400).json(result);
});

router.get("/vote-count/:partyId", async (req, res) => {
  const { partyId } = req.params;
  const result = await votingService.getVoteCount(partyId);
  res.status(result.success ? 200 : 400).json(result);
});
module.exports = router;
