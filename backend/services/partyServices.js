const admin = require("firebase-admin");
const db = admin.firestore();
const userCollection = db.collection("parties");

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

module.exports = {
  createParty,
};
