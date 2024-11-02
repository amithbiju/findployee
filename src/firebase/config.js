// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2JlzjuCdjUq_5rJk1s43OozJre8nU7os",
  authDomain: "findployee.firebaseapp.com",
  projectId: "findployee",
  storageBucket: "findployee.firebasestorage.app",
  messagingSenderId: "1080850327746",
  appId: "1:1080850327746:web:5b25a64a812002ba57335b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

export {auth,app};