const express = require("express");
const votingService = require("../services/votingService");

const router = express.Router();

router.post("/cast", async (req, res) => {
  const { voterId, candidateId } = req.body;
  const result = await votingService.castVote(voterId, candidateId);
  res.json(result);
});

module.exports = router;
