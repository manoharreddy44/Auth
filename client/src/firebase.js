// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b3053.firebaseapp.com",
  projectId: "mern-auth-b3053",
  storageBucket: "mern-auth-b3053.firebasestorage.app",
  messagingSenderId: "209698585961",
  appId: "1:209698585961:web:e6569cfebc841c3b7211f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);