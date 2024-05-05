// repositories/VoterRepository.ts
import { db } from '../firebase';
import { Voter } from '../models/Voter';
import { collection, doc, setDoc } from 'firebase/firestore';

const votersCollection = collection(db, 'voters'); // Use 'collection' function

export const createVoter = async (voter: Voter): Promise<void> => {
  await setDoc(doc(votersCollection, voter.id), voter); // Use 'doc' and 'setDoc' functions
};

// Implement other CRUD operations as needed
