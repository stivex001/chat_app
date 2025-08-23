
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "chat-app-546a6.firebaseapp.com",
  projectId: "chat-app-546a6",
  storageBucket: "chat-app-546a6.firebasestorage.app",
  messagingSenderId: "269166845415",
  appId: "1:269166845415:web:301277d0d46297d1b43142",
  measurementId: "G-NF41KBT39W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
