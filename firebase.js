// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvnYDVAeipucZqCysXg4il1odvj9OSYvQ",
  authDomain: "netflix-f257d.firebaseapp.com",
  projectId: "netflix-f257d",
  storageBucket: "netflix-f257d.firebasestorage.app",
  messagingSenderId: "620913679954",
  appId: "1:620913679954:web:25b9dcb42cdf30194c498b",
  measurementId: "G-GER55J4WFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);