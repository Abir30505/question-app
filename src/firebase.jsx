import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzAhpkVP6Rci7wP6-EQfWaze_GNvvaRRU",
  authDomain: "quiz-app-caa23.firebaseapp.com",
  projectId: "quiz-app-caa23",
  storageBucket: "quiz-app-caa23.appspot.com",
  messagingSenderId: "743490085424",
  appId: "1:743490085424:web:d14257618e189be16d03f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };