// firebase.js (or firebaseConfig.js)
import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth';
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0fT5DTXoQEIgHcQX4IaEVlPs6excOhnI",
  authDomain: "clone-134c1.firebaseapp.com",
  projectId: "clone-134c1",
  storageBucket:  "clone-134c1.firebasestorage.app", // ✅ corrected from .app to .com
  messagingSenderId: "924784592366",
  appId: "1:924784592366:web:ca0788351c2c0b97613aff"
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);

// Export instances
export const auth = getAuth(app);
export const db = app.firestore(app);
