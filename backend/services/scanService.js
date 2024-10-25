const { db } = require('../firebaseAdmin');
const admin = require('firebase-admin');

async function createVoter(email, name, passKey) {
    const voterRef = db.collection('voters').doc();
    const passKeyRef = await createPassKey(passKey);

    await voterRef.set({
        nrcNumber,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        passKeyId: passKeyRef.id,
    });

    return voterRef.id;
}

async function createPassKey(passKey) {
    const passKeyRef = db.collection('passKeys').doc();

    await passKeyRef.set({
        publicKey: passKey.publicKey,
        counter: passKey.counter,
        deviceType: passKey.deviceType,
        backedUp: passKey.backedUp,
        transports: passKey.transports || ['internal'],
        credentialID: passKey.credentialID,
        userId: passKey.userId,
    });

    return passKeyRef;
}

async function getVoterByEmail(email) {
    const snapshot = await db.collection('voters').where('email', '==', email).get();
    if (snapshot.empty) {
        return null;
    }

    const voter = snapshot.docs[0];
    return { id: voter.id, ...voter.data() };
}

async function getVoterById(id) {
    const voterRef = db.collection('voters').doc(id);
    const voterSnap = await voterRef.get();

    if (!voterSnap.exists) {
        return null;
    }

    return { id: voterSnap.id, ...voterSnap.data() };
}

async function updateVoterCounter(voterId, counter) {
    const voterRef = db.collection('voters').doc(voterId);
    const voterSnap = await voterRef.get();

    if (!voterSnap.exists) {
        throw new Error("Voter not found");
    }

    const passKeyId = voterSnap.data().passKeyId;
    const passKeyRef = db.collection('passKeys').doc(passKeyId);

    await passKeyRef.update({ counter });
}

module.exports = {
    createVoter,
    createPassKey,
    getVoterByEmail,
    getVoterById,
    updateVoterCounter,
};
