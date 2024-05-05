// controllers/VoterController.ts
import { Request, Response } from 'express';
import { registerVoter } from '../services/VoterService';
import { Voter } from '../models/Voter';

export const registerVoterController = async (req: Request, res: Response): Promise<void> => {
  const voterData: Voter = req.body;
  try {
    await registerVoter(voterData);
    res.status(201).send('Voter registered successfully');
  } catch (error) {
    console.error('Error registering Voter:', error);
    res.status(500).send('Internal server error');
  }
};

// Implement other controller functions as needed
