// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt-sU8A704XEZJqNLnXU6SpKrq6_9j5IE",
  authDomain: "woc-pro.firebaseapp.com",
  projectId: "woc-pro",
  storageBucket: "woc-pro.firebasestorage.app",
  messagingSenderId: "371252954558",
  appId: "1:371252954558:web:7c719bd71acac718fa65ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;