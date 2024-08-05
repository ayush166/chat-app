// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore functions

const firebaseConfig = {
  apiKey: "AIzaSyALLCYA8gjcKb0u5dXowaxrbZ_L91derDs",
  authDomain: "real-time-chat-b2040.firebaseapp.com",
  projectId: "real-time-chat-b2040",
  storageBucket: "real-time-chat-b2040.appspot.com",
  messagingSenderId: "620991880816",
  appId: "1:620991880816:web:fc5f1624284ece85c19eb5",
  measurementId: "G-46JK5XDC1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
