const admin = require("firebase-admin");
const db = admin.firestore();
const votersCollection = db.collection("voters");

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Approximate age in years
}

// Function to register a voter with validations
async function registerVoter(voterData) {
  const {
    fullName,
    dateOfBirth,
    gender,
    nrcNumber,
    phoneNumber,
    residentialAddress,
    province,
    constituency,
  } = voterData;

  try {
    // Validation array to hold error messages
    const validationErrors = [];

    // Check if the NRC number already exists
    const nrcSnapshot = await votersCollection.where("nrcNumber", "==", nrcNumber).get();
    if (!nrcSnapshot.empty) {
      validationErrors.push("Voter already exists with this NRC number.");
    }

    // Check if the phone number already exists
    const phoneSnapshot = await votersCollection.where("phoneNumber", "==", phoneNumber).get();
    if (!phoneSnapshot.empty) {
      validationErrors.push("Phone number belongs to someone else.");
    }

    // Calculate age and check if the person is old enough to vote
    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      validationErrors.push("You're not old enough to vote.");
    }

    // If there are any validation errors, return them without registering the voter
    if (validationErrors.length > 0) {
      return { success: false, messages: validationErrors };
    }

    // Register the voter if all checks pass
    const voterRef = votersCollection.doc();
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
      success: true,
      message: "Voter registered successfully",
      data: {
        id: voterRef.id,
        fullName,
        dateOfBirth,
        gender,
        nrcNumber,
        phoneNumber,
        residentialAddress,
        province,
        constituency,
      },
    };
  } catch (error) {
    return { success: false, message: "Failed to register voter: " + error.message };
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

// Function to get voter by ID
const getVoterById = async (voterId) => {
  try {
    const voterRef = votersCollection.doc(voterId);
    const doc = await voterRef.get();

    if (!doc.exists) {
      return { success: false, message: "Voter not found" };
    }

    return { success: true, data: { id: doc.id, ...doc.data() } };
  } catch (error) {
    console.error("Error fetching voter by ID:", error);
    return { success: false, message: error.message };
  }
};


module.exports = {
  registerVoter,
  getAllVoters,
  deleteVoterById,
  getVoterByNRC,
  getVoterById,
};
