const express = require("express");
const router = express.Router();
const partyService = require("../services/partyServices");

// POST route for party creation
router.post("/create", async (req, res) => {
  try {
    const { partyName, slogan, candidate } = req.body;

    // Call voterService to register the voter
    const party = await partyService.createParty({
      partyName,
      slogan,
      candidate,
    });

    res.status(201).json({ message: "Party creates successfully", party });
  } catch (error) {
    console.error("Error creating party:", error);
    res
      .status(500)
      .json({ message: "Failed to create party", error: error.message });
  }
});

//get all parties
router.get("/get-parties", async (req, res) => {
  const result = await partyService.getParties();

  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    return res.status(400).json({ message: result.message });
  }
});

// GET route to get a party by ID
router.get("/get-party/:id", async (req, res) => {
  const { id } = req.params;
  const result = await partyService.getPartyById(id);

  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    return res.status(404).json({ message: result.message });
  }
});

// Route to get parties by election ID
router.get('/get-parties-by-election/:electionId', async (req, res) => {
  const { electionId } = req.params;

  try {
    // Call the service function to get the parties
    const parties = await partyService.getPartiesByElectionId(electionId);

    // Send the response with the parties data
    res.status(200).json({
      success: true,
      data: parties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
