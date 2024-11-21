async function createVoter(email, name, passKey) {
    const voterRef = db.collection('voters').doc();
    const passKeyRef = await createPassKey(passKey);
    await voterRef.set({
      email,
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      passKeyId: passKeyRef.id,
    });
    return voterRef.id;
  }
  