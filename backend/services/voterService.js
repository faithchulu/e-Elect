const admin = require("firebase-admin");
const db = admin.firestore();
const votersCollection = db.collection("voters");

// Function to register a voter
async function registerVoter({
  fullName,
  dateOfBirth,
  gender,
  nrcNumber,
  phoneNumber,
  residentialAddress,
  province,
  constituency,
}) {
  try {
    // Validate inputs if needed

    // Example: Store voter details in Firestore
    const voterRef = db.collection("voters").doc();
    await voterRef.set({
      fullName,
      dateOfBirth,
      gender,
      nrcNumber,
      phoneNumber,
      residentialAddress,
      province,
      constituency,
    });

    // Return registered voter details including ID
    return {
      id: voterRef.id,
      fullName,
      dateOfBirth,
      gender,
      nrcNumber,
      phoneNumber,
      residentialAddress,
      province,
      constituency,
    };
  } catch (error) {
    throw new Error("Failed to register voter: " + error.message);
  }
}

// Function to get all voters
const getAllVoters = async () => {
  try {
    const snapshot = await votersCollection.get();

    if (snapshot.empty) {
      return { success: false, message: "No voters found" };
    }

    const voters = [];
    snapshot.forEach((doc) => {
      voters.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: voters };
  } catch (error) {
    console.error("Error getting voters:", error);
    return { success: false, message: error.message };
  }
};

// Function to delete a voter by ID
const deleteVoterById = async (voterId) => {
  try {
    const voterRef = votersCollection.doc(voterId);
    const doc = await voterRef.get();

    if (!doc.exists) {
      return { success: false, message: "Voter not found" };
    }

    await voterRef.delete();
    return { success: true, message: "Voter deleted successfully" };
  } catch (error) {
    console.error("Error deleting voter:", error);
    return { success: false, message: error.message };
  }
};

// Function to get voter by NRC number
const getVoterByNRC = async (nrcNumber) => {
  try {
    const snapshot = await votersCollection.where("nrcNumber", "==", nrcNumber).get();

    if (snapshot.empty) {
      return { success: false, message: "Voter not found" };
    }

    const voter = [];
    snapshot.forEach((doc) => {
      voter.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: voter[0] }; // Return the first matching voter
  } catch (error) {
    console.error("Error fetching voter by NRC:", error);
    return { success: false, message: error.message };
  }
};


module.exports = {
  registerVoter,
  getAllVoters,
  deleteVoterById,
  getVoterByNRC,
};
