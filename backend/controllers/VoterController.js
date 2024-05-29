// controllers/VoterController.ts
// import { Request, Response } from 'express';
const registerVoter = require('../services/VoterService');
const voter = require('../models/Voter');

const registerVoterController = async (req, res) => {
  const voterData = req.body;
  try {
    await registerVoter(voterData);
    res.status(201).send('Voter registered successfully');
  } catch (error) {
    console.error('Error registering Voter:', error);
    res.status(500).send('Internal server error');
  }
};

// Implement other controller functions as needed
