// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5d0ca.firebaseapp.com",
  projectId: "mern-estate-5d0ca",
  storageBucket: "mern-estate-5d0ca.appspot.com",
  messagingSenderId: "723322010758",
  appId: "1:723322010758:web:1d62800685f01705046507"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);