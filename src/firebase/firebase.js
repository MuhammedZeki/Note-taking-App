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
  apiKey: "AIzaSyCsAXl9jy-kSYlEhR1tS4q6jiuIQSsX25Y",
  authDomain: "note-taking-app-c7040.firebaseapp.com",
  projectId: "note-taking-app-c7040",
  storageBucket: "note-taking-app-c7040.firebasestorage.app",
  messagingSenderId: "425769134553",
  appId: "1:425769134553:web:e52aebdba6bb19524211c8",
  measurementId: "G-DVSN2MKEDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);