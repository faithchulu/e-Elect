const express = require("express");
const router = express.Router();
const partyService = require("../services/partyServices");

// POST route for party creation
router.post("/create", async (req, res) => {
  try {
    const {
      partyName,
      slogan,
      candidate,
    } = req.body;

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

module.exports = router;
