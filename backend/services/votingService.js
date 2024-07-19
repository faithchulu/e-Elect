const admin = require("firebase-admin");
const jsHashes = require("jshashes");

const db = admin.firestore();
const electionCollection = db.collection("elections");

//Service function to cast vote
const castVote = async (electionId, partyId, nrcNumber) => {
  try {
    const electionRef = electionCollection.doc(electionId);
    const electionDoc = await electionRef.get();

    if (!electionDoc.exists) {
      return { success: false, message: "Election not found" };
    }

    const resultsCollection = electionRef.collection("results");
    const resultQuerySnapshot = await resultsCollection
      .where("partyId", "==", partyId)
      .get();

    if (resultQuerySnapshot.empty) {
      return { success: false, message: "Party not found in results" };
    }

    // Update vote count for the party
    const batch = db.batch();
    resultQuerySnapshot.forEach((resultDoc) => {
      const resultDocRef = resultDoc.ref;
      batch.update(resultDocRef, {
        voteCount: admin.firestore.FieldValue.increment(1),
      });
    });

    // Generate the hash
    const hashString = `${nrcNumber}${partyId}`;
    const hash = new jsHashes.SHA256().hex(hashString);

    // Add hash to the hashes subcollection
    const hashesCollection = electionRef.collection("hashes");
    const hashDocRef = hashesCollection.doc(); // Auto-ID
    batch.set(hashDocRef, { hashValue: hash });

    await batch.commit();

    return { success: true };
  } catch (error) {
    console.error("Error casting vote:", error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  castVote,
};
