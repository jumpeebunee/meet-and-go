import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAi9mA5l4AYBeLVUfErw3D8Ajwcf-mDbr8",
  authDomain: "meet-and-go-1813c.firebaseapp.com",
  projectId: "meet-and-go-1813c",
  storageBucket: "meet-and-go-1813c.appspot.com",
  messagingSenderId: "610839602044",
  appId: "1:610839602044:web:5c689ca200bdbe770a7af9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);