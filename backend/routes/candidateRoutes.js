const express = require("express");
const { getCandidatesByElectionId } = require("./services/electionService");

const router = express.Router();

router.get("/api/election/get-candidates/:electionId", async (req, res) => {
  const { electionId } = req.params;
  const result = await getCandidatesByElectionId(electionId);

  if (result.success) {
    res.status(200).json(result.candidates);
  } else {
    res.status(404).json({ message: result.message });
  }
});

module.exports = router;
