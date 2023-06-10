import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDykNl2JYI2SSWfOQuyp1C3w9sWSJwy_ho",
  authDomain: "multimart-e015e.firebaseapp.com",
  projectId: "multimart-e015e",
  storageBucket: "multimart-e015e.appspot.com",
  messagingSenderId: "393229600970",
  appId: "1:393229600970:web:d48e7078fb8f43ebda8c33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
