const admin = require("firebase-admin");
const db = admin.firestore();
const electionCollection = db.collection("elections");



// Function to create a party
async function createElection({
    electionName,
    electionDescription,
    type,
    startDate,
    endDate,
    parties,
    status,
}) {
  try {
    // Store party data in firestore
    const electionRef= electionCollection.doc();
    await electionRef.set({
        electionName,
        electionDescription,
        type,
        startDate,
        endDate,
        parties,
        status,
    });

    // Return registered voter details including ID
    return {
     id: electionRef.id,
     electionName,
     electionDescription,
     type,
     startDate,
     endDate,
     parties,
     status,
    };
  } catch (error) {
    throw new Error("Failed to create election: " + error.message);
  }
}

//get all elections
const getElections = async () => {
    try {
        const snapshot = await electionCollection.get();
        
        const elections = [];
        snapshot.forEach(doc => {
            elections.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return { success: true, data: elections };
    } catch (error) {
        console.error('Error getting elections:', error);
        return { success: false, message: error.message };
    }
};



module.exports = {
  createElection,
  getElections
};
