const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

const tallyingService = {
  async tallyVotes() {
    try {
      const voteCounts = {};
      const votesSnapshot = await db.collection('votes').get();
      votesSnapshot.forEach((doc) => {
        const { candidateId } = doc.data();
        if (voteCounts[candidateId]) {
          voteCounts[candidateId] += 1;
        } else {
          voteCounts[candidateId] = 1;
        }
      });

      // Assuming you store results in a separate collection
      const resultDoc = db.collection('results').doc('currentResults');
      await resultDoc.set({ voteCounts, lastUpdated: firebaseAdmin.firestore.FieldValue.serverTimestamp() });

      return { success: true, voteCounts };
    } catch (error) {
      console.error('Error tallying votes:', error);
      return { success: false, message: 'Failed to tally votes' };
    }
  },
};

module.exports = tallyingService;
