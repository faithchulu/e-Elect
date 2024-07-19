const admin = require("firebase-admin");
const db = admin.firestore();
const electionCollection = db.collection("elections");

// Function to create a party
async function createElection({
  electionName,
  electionDescription,
  type,
  startDate,
  endDate,
  parties,
  status,
}) {
  try {
    // Store party data in firestore
    const electionRef = electionCollection.doc();
    await electionRef.set({
      electionName,
      electionDescription,
      type,
      startDate,
      endDate,
      parties,
      status,
    });

    // Return registered voter details including ID
    return {
      id: electionRef.id,
      electionName,
      electionDescription,
      type,
      startDate,
      endDate,
      parties,
      status,
    };
  } catch (error) {
    throw new Error("Failed to create election: " + error.message);
  }
}

//get all elections
const getElections = async () => {
  try {
    const snapshot = await electionCollection.get();

    const elections = [];
    snapshot.forEach((doc) => {
      elections.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { success: true, data: elections };
  } catch (error) {
    console.error("Error getting elections:", error);
    return { success: false, message: error.message };
  }
};

// Function to get an election by ID
const getElectionById = async (id) => {
  try {
    const electionRef = electionCollection.doc(id);
    const doc = await electionRef.get();
    if (!doc.exists) {
      return { success: false, message: "Election not found" };
    }
    return { success: true, data: { id: doc.id, ...doc.data() } };
  } catch (error) {
    console.error("Error getting election by ID:", error);
    return { success: false, message: error.message };
  }
};

// Function to open voting for an election
const openVoting = async (id) => {
  try {
    const electionRef = electionCollection.doc(id);
    const doc = await electionRef.get();
    if (!doc.exists) {
      return { success: false, message: "Election not found" };
    }

    const electionData = doc.data();

    // Update election status to 'voting'
    await electionRef.update({ status: "voting" });

    // Create results subcollection
    const resultsCollection = electionRef.collection("results");
    const batch = db.batch();

    electionData.parties.forEach((partyId) => {
      const resultDocRef = resultsCollection.doc();
      batch.set(resultDocRef, { partyId, voteCount: 0 });
    });

    await batch.commit();

    return { success: true, message: "Voting opened and results initialized" };
  } catch (error) {
    console.error("Error opening voting:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  createElection,
  getElections,
  getElectionById,
  openVoting,
};
