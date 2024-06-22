// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.ELO_FIREBASE_API_KEY!,
  authDomain: "public-elo.firebaseapp.com",
  projectId: "public-elo",
  storageBucket: "public-elo.appspot.com",
  messagingSenderId: "873390382211",
  appId: process.env.ELO_FIREBASE_APP_ID!,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
