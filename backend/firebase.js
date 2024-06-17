const firebase = require('firebase/app');
require('firebase/auth');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const apiKey = process.env.API_KEY;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "evoting-f6e59.firebaseapp.com",
    projectId: "evoting-f6e59",
    storageBucket: "evoting-f6e59.appspot.com",
    messagingSenderId: "160608534616",
    appId: "1:160608534616:web:3abf6a7580041edd220a2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance and assert its type
const db = getFirestore(app);

module.exports = { db };
