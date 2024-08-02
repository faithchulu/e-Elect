const axios = require('axios');
const { db } = require('./firebaseAdmin');

const getCandidatesByElectionId = async (electionId) => {
  try {
    const electionRef = db.collection('elections').doc(electionId);
    const electionDoc = await electionRef.get();

    if (!electionDoc.exists) {
      return { success: false, message: "Election not found" };
    }
    const electionData = electionDoc.data();
    const partyIds = electionData.parties;
    const partyDetailsPromises = partyIds.map(async (partyId) => {
      const response = await axios.get(`http://localhost:4000/api/party/get-party/${partyId}`);
      return response.data;
    });
    const partyDetails = await Promise.all(partyDetailsPromises);

    return { success: true, candidates: partyDetails };
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return { success: false, message: error.message };
  }
};

module.exports = { getCandidatesByElectionId };
