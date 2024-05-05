// routes/candidateRoutes.ts
import express from 'express';
import { addCandidateController } from '../controllers/CandidateController';

const router = express.Router();

router.post('/add', addCandidateController);

export default router;

// Add more route files as necessary