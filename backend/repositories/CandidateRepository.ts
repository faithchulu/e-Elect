// repositories/CandidateRepository.ts
import { db } from '../firebase';
import { Candidate } from '../models/Candidate';

const candidatesCollection = db.collection('candidates');

export const createCandidate = async (candidate: Candidate): Promise<void> => {
  await candidatesCollection.doc(candidate.id).set(candidate);
};

// Implement other CRUD operations as needed

// Add more repository functions as necessary