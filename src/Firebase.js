// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDC-BZoaEXNzvdNj5yv8Io4nkGYStiwu4E",
  authDomain: "parking-52073.firebaseapp.com",
  projectId: "parking-52073",
  storageBucket: "parking-52073.appspot.com",
  messagingSenderId: "421240752921",
  appId: "1:421240752921:web:8f1dba8a60f5050c0f1388",
  measurementId: "G-RV9NGT4WQM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);
