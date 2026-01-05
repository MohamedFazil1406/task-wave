// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2zn70v_GO-ugpCGpf0REXiEH1E_h5Y9w",
  authDomain: "my-task-wave.firebaseapp.com",
  projectId: "my-task-wave",
  storageBucket: "my-task-wave.firebasestorage.app",
  messagingSenderId: "122599452986",
  appId: "1:122599452986:web:41ff335be5ef92b5026003",
  measurementId: "G-B3DEQBQ8QS",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
