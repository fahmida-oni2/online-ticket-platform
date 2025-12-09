// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcgCBt9w1DCG53A41xXdFcIja7ZrZjBGo",
  authDomain: "online-ticket-platform.firebaseapp.com",
  projectId: "online-ticket-platform",
  storageBucket: "online-ticket-platform.firebasestorage.app",
  messagingSenderId: "1069434952114",
  appId: "1:1069434952114:web:6356e3cc62c538adf5ecab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;