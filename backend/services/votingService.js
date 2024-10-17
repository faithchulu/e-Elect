const {Web3} = require('web3');
const admin = require("firebase-admin");
const jsHashes = require("jshashes");
const VotingArtifact = require("../blockchain/build/contracts/Voting.json"); 
const db = admin.firestore();
const electionCollection = db.collection("elections");

// Initialize Web3 and set the provider (e.g., Ganache or your network)
const web3 = new Web3("http://127.0.0.1:7545"); 
const contractAddress = "0xfA977D06Deb4A017147d3Fa915489d4C150D5654"; // Replace with your contract address
const votingContract = new web3.eth.Contract(VotingArtifact.abi, contractAddress);

// Service function to cast vote
const castVote = async (electionId, partyId, nrcNumber, voterAddress) => {
  try {
    const electionRef = electionCollection.doc(electionId);
    const electionDoc = await electionRef.get();

    if (!electionDoc.exists) {
      return { success: false, message: "Election not found" };
    }

    // Create transaction to cast the vote
    const transaction = await votingContract.methods.vote(partyId).send({ from: voterAddress });

    // Check transaction receipt for confirmation
    if (!transaction.status) {
      return { success: false, message: "Transaction failed" };
    }

    // Generate the hash
    const hashString = `${nrcNumber}${partyId}`;
    const hash = new jsHashes.SHA256().hex(hashString);

    // Add hash to the hashes subcollection
    const hashesCollection = electionRef.collection("hashes");
    const hashDocRef = hashesCollection.doc(); // Auto-ID
    await hashDocRef.set({ hashValue: hash });

    return { success: true, message: "Vote cast successfully!" };
  } catch (error) {
    console.error("Error casting vote:", error);
    return { success: false, message: error.message };
  }
};

const getVoteCount = async (partyId) => {
  try {
    const count = await votingContract.methods.getVoteCount(partyId).call();
    return { success: true, voteCount: count };
  } catch (error) {
    console.error("Error fetching vote count:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  castVote,
  getVoteCount,
};
