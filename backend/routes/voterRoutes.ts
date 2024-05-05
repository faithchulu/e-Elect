// routes/userRoutes.ts
import express from 'express';
import { registerVoterController } from '../controllers/VoterController';

const router = express.Router();

router.post('/register', registerVoterController);

export default router;


