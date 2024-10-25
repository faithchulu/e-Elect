const admin = require("firebase-admin");
const db = admin.firestore();
const crypto = require('crypto'); // Import the crypto module
const partyCollection = db.collection("parties");

// Function to generate a random uint256 ID
function generateUint256Id() {
  const randomBytes = crypto.randomBytes(32); // Generate 32 random bytes
  return `0x${randomBytes.toString('hex')}`; // Convert to hexadecimal string with 0x prefix
}

// Function to create a party
async function createParty({ partyName, slogan, candidate }) {
  try {
    // Generate uint256 ID for the party
    const partyId = generateUint256Id();

    // Store party data in Firestore with the generated partyId
    const partyRef = partyCollection.doc(partyId); // Use partyId as the document ID
    await partyRef.set({
      id: partyId, // Store the generated uint256 ID
      partyName,
      slogan,
      candidate,
    });

    // Return registered party details including ID
    return {
      id: partyId,
      partyName,
      slogan,
      candidate,
    };
  } catch (error) {
    throw new Error("Failed to create party: " + error.message);
  }
}

// Get all parties function remains unchanged
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

// Service function to get parties by election ID remains unchanged
const getPartiesByElectionId = async (electionId) => {
  try {
    const electionDoc = await db.collection("elections").doc(electionId).get();

    if (!electionDoc.exists) {
      throw new Error("Election not found");
    }

    const electionData = electionDoc.data();
    const partyIds = electionData.parties || [];

    const partyPromises = partyIds.map((partyId) => {
      return db.collection("parties").doc(partyId).get();
    });

    const partySnapshots = await Promise.all(partyPromises);

    const parties = partySnapshots
      .map((partySnap) => {
        if (partySnap.exists) {
          return { id: partySnap.id, ...partySnap.data() };
        }
        return null;
      })
      .filter(Boolean);

    return parties;
  } catch (error) {
    throw new Error(`Error fetching parties: ${error.message}`);
  }
};

module.exports = {
  createParty,
  getParties,
  getPartyById,
  getPartiesByElectionId,
};
