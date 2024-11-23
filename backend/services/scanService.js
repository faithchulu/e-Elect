const { db } = require("../firebaseAdmin");
const admin = require("firebase-admin");

async function createVoter(nrcNumber, name, passKey) {
  const voterRef = db.collection("voters").doc();
  const passKeyRef = await createPassKey(passKey);

  await voterRef.set({
    nrcNumber: nrcNumber,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    passKeyId: passKeyRef.id,
  });

  return voterRef.id;
}

async function createPassKey(passKey) {
  const passKeyRef = db.collection("passKeys").doc();

  await passKeyRef.set({
    publicKey: passKey.publicKey,
    counter: passKey.counter,
    deviceType: passKey.deviceType,
    backedUp: passKey.backedUp,
    transports: passKey.transports || ["internal"],
    credentialID: passKey.credentialID,
    userId: passKey.userId,
    nrcNumber: passKey.nrcNumber,
  });

  return passKeyRef;
}

async function getVoterByEmail(nrcNumber) {
  console.log(`nrc: ${nrcNumber}`);
  const snapshot = await db
    .collection("passKeys")
    .where("nrcNumber", "==", nrcNumber)
    .get();
  // console.log(snapshot);

  if (snapshot.empty) {
    return null;
  }

  const voter = snapshot.docs[0];
  console.log(voter);

  return { id: voter.id, ...voter.data() };
}

async function getVoterByEmails(nrcNumber) {
  const snapshot = await db
    .collection("passkeys")
    .where("nrcNumber", "==", nrcNumber)
    .get();
  if (snapshot.empty) {
    return null;
  }

  const voter = snapshot.docs[0];
  return { id: voter.id, ...voter.data() };
}

async function getVoterById(id) {
  const voterRef = db.collection("passKeys").doc(id);

  console.log(voterRef);

  const voterSnap = await voterRef.get();

  console.log(voterSnap);

  if (!voterSnap.exists) {
    return null;
  }

  return { id: voterSnap.id, ...voterSnap.data() };
}

async function getVoterPassKeyById(userId) {
  const voterRef = db.collection("passKeys").doc(userId);

  const doc = await voterRef.get();

  console.log("this is ref", doc);

  const voterSnap = await voterRef.get();

  if (!voterRef.exists) {
    return null;
  }

  return { id: voterRef.id, ...voterRef.data() };
}

async function updateVoterCounter(nrcNumber, counter) {
  // Find the document in the passKeys collection based on userId
  const voterSnap = await db
    .collection("passKeys")
    .where("nrcNumber", "==", nrcNumber)
    .limit(1)
    .get();

  if (voterSnap.empty) {
    throw new Error("Voter not found");
  }

  // Assuming each userId is unique and we only expect one document
  const voterDoc = voterSnap.docs[0];
  const passKeyId = voterDoc.id; // Use the document ID as the passKeyId

  // Update the counter for the found document
  await db.collection("passKeys").doc(passKeyId).update({ counter });
}

module.exports = {
  createVoter,
  createPassKey,
  getVoterByEmail,
  getVoterByEmails,
  getVoterById,
  updateVoterCounter,
  getVoterPassKeyById,
};
