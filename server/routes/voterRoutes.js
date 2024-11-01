const express = require("express");
const router = express.Router();
const voterService = require("../services/voterService");

// POST route for voter registration
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      nrcNumber,
      phoneNumber,
      residentialAddress,
      province,
      constituency,
    } = req.body;

    // Call voterService to register the voter
    const voter = await voterService.registerVoter({
      fullName,
      dateOfBirth,
      gender,
      nrcNumber,
      phoneNumber,
      residentialAddress,
      province,
      constituency,
    });

    res.status(201).json({ message: "Voter registered successfully", voter });
  } catch (error) {
    console.error("Error registering voter:", error);
    res
      .status(500)
      .json({ message: "Failed to register voter", error: error.message });
  }
});

// GET route for fetching all voters
router.get("/get-voters", async (req, res) => {
  try {
    const result = await voterService.getAllVoters();

    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error fetching voters:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch voters", error: error.message });
  }
});

// DELETE route for deleting a voter by ID
router.delete("/delete-voter/:id", async (req, res) => {
  const voterId = req.params.id;

  try {
    const result = await voterService.deleteVoterById(voterId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error deleting voter:", error);
    res
      .status(500)
      .json({ message: "Failed to delete voter", error: error.message });
  }
});

// GET route for fetching a voter by NRC number
router.get("/get-voter/:nrcNumber", async (req, res) => {
  const { nrcNumber } = req.params;

  try {
    const result = await voterService.getVoterByNRC(nrcNumber);

    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error fetching voter by NRC:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch voter", error: error.message });
  }
});


module.exports = router;
