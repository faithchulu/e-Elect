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

module.exports = router;
