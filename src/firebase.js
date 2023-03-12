import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = ({
        apiKey: "AIzaSyC6WZ-flU846mWLTsFYxjECsILVcxx6chw",
        authDomain: "chat-app-c5180.firebaseapp.com",
        projectId: "chat-app-c5180",
        storageBucket: "chat-app-c5180.appspot.com",
        messagingSenderId: "42631079389",
        appId: "1:42631079389:web:6bd3f5fb98e690bf8a0234"
      });

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
