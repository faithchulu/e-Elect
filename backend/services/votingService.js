const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

const votingService = {
  async castVote(voterId, candidateId) {
    try {
      const vote = {
        voterId,
        candidateId,
        timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      };

      await db.collection('votes').add(vote);
      return { success: true, message: 'Vote cast successfully' };
    } catch (error) {
      console.error('Error casting vote:', error);
      return { success: false, message: 'Failed to cast vote' };
    }
  },
};

module.exports = votingService;
