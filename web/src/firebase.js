// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTONVe0auaFCu8FBB4hGM-4NbIQXD23LA",
  authDomain: "marketplace-app-14259.firebaseapp.com",
  projectId: "marketplace-app-14259",
  storageBucket: "marketplace-app-14259.firebasestorage.app",
  messagingSenderId: "1072775879233",
  appId: "1:1072775879233:web:48028f3bbf071648dac4c0",
  measurementId: "G-VS7XWK9EST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);