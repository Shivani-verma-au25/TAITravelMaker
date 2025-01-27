// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-1Nv5ZxYhcTK3pgQ490zW2xg446QbVLA",
  authDomain: "attraveler.firebaseapp.com",
  projectId: "attraveler",
  storageBucket: "attraveler.firebasestorage.app",
  messagingSenderId: "332138355802",
  appId: "1:332138355802:web:1187b5acb9ee9c2eac0c63",
  measurementId: "G-N8JJR25X7F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
