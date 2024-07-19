const express = require("express");
const router = express.Router();
const electionService = require("../services/electionServices");

const status = "registration";

// POST route for party creation
router.post("/create", async (req, res) => {
  try {
    const {
      electionName,
      electionDescription,
      type,
      startDate,
      endDate,
      parties,
      status,
    } = req.body;

    // Call voterService to register the voter
    const election = await electionService.createElection({
      electionName,
      electionDescription,
      type,
      startDate,
      endDate,
      parties,
      status,
    });

    res
      .status(201)
      .json({ message: "Election created successfully", election });
  } catch (error) {
    console.error("Error creating election:", error);
    res
      .status(500)
      .json({ message: "Failed to create election", error: error.message });
  }
});

//get all elections
router.get("/get-elections", async (req, res) => {
  const result = await electionService.getElections();

  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    return res.status(400).json({ message: result.message });
  }
});

// GET route to get an election by ID
router.get("/get-election/:id", async (req, res) => {
  const { id } = req.params;
  const result = await electionService.getElectionById(id);

  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json({ message: result.message });
  }
});

// POST route to open voting for an election
router.post("/open-voting/:id", async (req, res) => {
  const { id } = req.params;
  const result = await electionService.openVoting(id);

  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(400).json({ message: result.message });
  }
});

module.exports = router;
