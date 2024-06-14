const admin = require('firebase-admin');
const db = admin.firestore();
const userCollection = db.collection('voters');


// Function to register a voter
async function registerVoter({
    fullName,
    dateOfBirth,
    gender,
    nrcNumber,
    nrcImage,
    phoneNumber,
    residentialAddress,
    province,
    constituency
}) {
    try {
        // Validate inputs if needed

        // Example: Store voter details in Firestore
        const voterRef = db.collection('voters').doc();
        await voterRef.set({
            fullName,
            dateOfBirth,
            gender,
            nrcNumber,
            nrcImage,
            phoneNumber,
            residentialAddress,
            province,
            constituency
        });

        // Return registered voter details including ID
        return {
            id: voterRef.id,
            fullName,
            dateOfBirth,
            gender,
            nrcNumber,
            nrcImage,
            phoneNumber,
            residentialAddress,
            province,
            constituency
        };
    } catch (error) {
        throw new Error('Failed to register voter: ' + error.message);
    }
}

module.exports = {
    registerVoter,
};
