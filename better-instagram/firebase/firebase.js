import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByIX9VCoQqYqCUI1v_pjR1N4ARG_fAMGM",
  authDomain: "instagram-clone-7638a.firebaseapp.com",
  projectId: "instagram-clone-7638a",
  storageBucket: "instagram-clone-7638a.appspot.com",
  messagingSenderId: "896975114056",
  appId: "1:896975114056:web:269837d4a5e06fe6d2ed7d",
  measurementId: "G-8ZDRN72D4B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };