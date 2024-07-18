const admin = require("firebase-admin");
const db = admin.firestore();
const partyCollection = db.collection("parties");

// Function to create a party
async function createParty({
    partyName,
    slogan,
    candidate,
}) {
  try {
    // Store party data in firestore
    const partyRef = db.collection("parties").doc();
    await partyRef.set({
     partyName,
     slogan,
     candidate,
    });

    // Return registered voter details including ID
    return {
     id: partyRef.id,
     partyName,
     slogan,
     candidate,
    };
  } catch (error) {
    throw new Error("Failed to create party: " + error.message);
  }
}

//get all parties
const getParties = async () => {
  try {
      const snapshot = await partyCollection.get();
      
      const parties = [];
      snapshot.forEach(doc => {
        parties.push({
              id: doc.id,
              ...doc.data()
          });
      });
      return { success: true, data: parties };
  } catch (error) {
      console.error('Error getting parties:', error);
      return { success: false, message: error.message };
  }
};

module.exports = {
  createParty,
  getParties,
};
