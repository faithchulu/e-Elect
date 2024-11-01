async function createPassKey(passKey) {
  const passKeyRef = db.collection("passKeys").doc();
  await passKeyRef.set({
    publicKey: passKey.publicKey,
    counter: passKey.counter || 1,
    deviceType: passKey.deviceType,
    backedUp: passKey.backedUp,
    transports: passKey.transports || ["internal"],
    credentialID: passKey.credentialID,
    userId: passKey.userId,
    nrcNumber: passKey.nrcNumber,
  });
  return voters;
}
