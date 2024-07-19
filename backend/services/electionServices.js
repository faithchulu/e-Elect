const admin = require("firebase-admin");
const db = admin.firestore();
const electionCollection = db.collection("elections");
const partyService = require("./partyServices");

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

// Function to update an election by ID
const updateElectionById = async (electionId, updateData) => {
  try {
    const electionRef = electionCollection.doc(electionId);
    const electionDoc = await electionRef.get();

    if (!electionDoc.exists) {
      return { success: false, message: "Election not found" };
    }

    // Update the election document with new data
    await electionRef.update(updateData);

    // Fetch the updated election data
    const updatedDoc = await electionRef.get();
    return { success: true, data: updatedDoc.data() };
  } catch (error) {
    console.error("Error updating election:", error);
    return { success: false, message: error.message };
  }
};

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

    // Create hashes subcollection with one document
    const hashesCollection = electionRef.collection("hashes");
    const hashDocRef = hashesCollection.doc(); // Auto-generated ID
    batch.set(hashDocRef, { hashValue: "Hash creation default" });

    // Commit all changes
    await batch.commit();

    return {
      success: true,
      message: "Voting opened, results initialized, and hashes created",
    };
  } catch (error) {
    console.error("Error opening voting:", error);
    return { success: false, message: error.message };
  }
};

// Function to close voting for an election
const closeVoting = async (id) => {
  try {
    const electionRef = electionCollection.doc(id);
    const doc = await electionRef.get();
    if (!doc.exists) {
      return { success: false, message: "Election not found" };
    }

    // Update election status to 'closed'
    await electionRef.update({ status: "closed" });

    return { success: true, message: "Election closed successfully" };
  } catch (error) {
    console.error("Error closing election:", error);
    return { success: false, message: error.message };
  }
};

const getElectionResults = async (electionId) => {
  try {
    const electionRef = electionCollection.doc(electionId);
    const electionDoc = await electionRef.get();

    if (!electionDoc.exists) {
      return { success: false, message: "Election not found" };
    }

    const electionData = electionDoc.data();
    const resultsCollection = electionRef.collection("results");
    const resultsSnapshot = await resultsCollection.get();

    const results = [];
    const parties = [];
    let totalVoteCount = 0;

    // Fetch all parties data in parallel
    const partyPromises = resultsSnapshot.docs.map(async (resultDoc) => {
      const resultData = resultDoc.data();
      const partyIdRef = resultData.partyId;

      // Fetch party data
      const partyResponse = await partyService.getPartyById(partyIdRef);

      // Push results and party data
      if (partyResponse.success) {
        results.push({
          partyId: partyResponse.data.id,
          voteCount: resultData.voteCount,
        });
        parties.push(partyResponse.data);
        totalVoteCount += resultData.voteCount;
      }
    });

    // Wait for all party data to be fetched
    await Promise.all(partyPromises);

    return {
      success: true,
      data: {
        electionId,
        electionName: electionData.electionName,
        parties,
        results,
        totalVoteCount,
      },
    };
  } catch (error) {
    console.error("Error getting election results:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  createElection,
  getElections,
  getElectionById,
  openVoting,
  closeVoting,
  getElectionResults,
  updateElectionById,
};
