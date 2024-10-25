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
    return voters;
  }
  