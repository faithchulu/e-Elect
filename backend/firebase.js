import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Firestore } from 'firebase/firestore';


const apiKey = process.env.API_KEY


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

export { db };
