// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAr-TkTwfvkqDoLoLkxteZShJoqm2tLXk",
  authDomain: "btt-store.firebaseapp.com",
  projectId: "btt-store",
  storageBucket: "btt-store.appspot.com",
  messagingSenderId: "578342966166",
  appId: "1:578342966166:web:b38422d4c0484dd69a03b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore( app )