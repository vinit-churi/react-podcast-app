import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCadkdqxL8djxTiymIS8mjwLvHIxvFwMfo",
  authDomain: "knowledge-hub-5aa9f.firebaseapp.com",
  projectId: "knowledge-hub-5aa9f",
  storageBucket: "knowledge-hub-5aa9f.appspot.com",
  messagingSenderId: "1046180742752",
  appId: "1:1046180742752:web:c3a83f9cfaf867634c6505",
  measurementId: "G-76G03H21SC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
