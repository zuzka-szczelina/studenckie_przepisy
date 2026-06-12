// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfUooYQhxFG6VjazD72_guekrdY2LG6_M",
  authDomain: "kuchniastudenta-f9e34.firebaseapp.com",
  projectId: "kuchniastudenta-f9e34",
  storageBucket: "kuchniastudenta-f9e34.firebasestorage.app",
  messagingSenderId: "164288219099",
  appId: "1:164288219099:web:fe18397ac6fe8cd86bc9fe",
  measurementId: "G-CWYPBG1Z03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const measurementId = firebaseConfig.measurementId;
