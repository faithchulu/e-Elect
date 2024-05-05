// controllers/CandidateController.ts
import { Request, Response } from 'express';
import { addCandidate } from '../services/CandidateService';
import { Candidate } from '../models/Candidate';

export const addCandidateController = async (req: Request, res: Response): Promise<void> => {
  const candidateData: Candidate = req.body;
  try {
    await addCandidate(candidateData);
    res.status(201).send('Candidate added successfully');
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).send('Internal server error');
  }
};

// Implement other controller functions as needed

