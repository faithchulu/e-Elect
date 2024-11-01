const express = require("express");
const tallyingService = require("../services/tallyingService");

const router = express.Router();

router.get("/results", async (req, res) => {
  const result = await tallyingService.tallyVotes();
  res.json(result);
});

module.exports = router;
