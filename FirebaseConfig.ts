// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfcfzmg0nacYeeire8Gdl79QvZegX6igs",
  authDomain: "notepad-6164.firebaseapp.com",
  projectId: "notepad-6164",
  storageBucket: "notepad-6164.firebasestorage.app",
  messagingSenderId: "143273449847",
  appId: "1:143273449847:web:3f36948a815dbf05de6972",
  measurementId: "G-4K3SRLLLX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);