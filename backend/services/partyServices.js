const admin = require("firebase-admin");
const db = admin.firestore();
const partyCollection = db.collection("parties");

// Function to create a party
async function createParty({ partyName, slogan, candidate }) {
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
    snapshot.forEach((doc) => {
      parties.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { success: true, data: parties };
  } catch (error) {
    console.error("Error getting parties:", error);
    return { success: false, message: error.message };
  }
};

// Function to get a party by ID
const getPartyById = async (id) => {
  try {
    const partyRef = partyCollection.doc(id);
    const doc = await partyRef.get();
    if (!doc.exists) {
      return { success: false, message: "Party not found" };
    }
    return { success: true, data: { id: doc.id, ...doc.data() } };
  } catch (error) {
    console.error("Error getting party by ID:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  createParty,
  getParties,
  getPartyById,
};
