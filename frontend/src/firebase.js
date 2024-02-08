// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-791de.firebaseapp.com",
  projectId: "mern-blog-791de",
  storageBucket: "mern-blog-791de.appspot.com",
  messagingSenderId: "158995758232",
  appId: "1:158995758232:web:5d1df05e8b45b311b464ed",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
