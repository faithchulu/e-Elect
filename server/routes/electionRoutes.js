const express = require("express");
const router = express.Router();
const electionService = require("../services/electionServices");

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

// PUT route for updating an election by ID
router.put("/update/:id", async (req, res) => {
  try {
    const electionId = req.params.id;
    const updateData = req.body;

    // Call the service to update the election
    const result = await electionService.updateElectionById(
      electionId,
      updateData
    );

    if (result.success) {
      res
        .status(200)
        .json({ message: "Election updated successfully", data: result.data });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error updating election:", error);
    res
      .status(500)
      .json({ message: "Failed to update election", error: error.message });
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

//Get active election staus == voting||registration
router.get("/active-elections", async (req, res) => {
  const result = await electionService.getActiveElections();
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json({ message: result.message });
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

// POST route to close voting for an election
router.post("/close-voting/:id", async (req, res) => {
  const { id } = req.params;
  const result = await electionService.closeVoting(id);

  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(400).json({ message: result.message });
  }
});

// GET route to view results of an election by ID
router.get("/view-results/:id", async (req, res) => {
  const { id } = req.params;
  const result = await electionService.getElectionResults(id);

  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json({ message: result.message });
  }
});


//Get closed election staus == closed
router.get("/closed-elections", async (req, res) => {
  const result = await electionService.getClosedElections();
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(500).json({ message: result.message });
  }
});

module.exports = router;
