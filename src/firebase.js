// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-z9XQ601kAJVpRK2Mb3brnrrMss4kxVo",
  authDomain: "realtor-clone-react-4db2a.firebaseapp.com",
  projectId: "realtor-clone-react-4db2a",
  storageBucket: "realtor-clone-react-4db2a.appspot.com",
  messagingSenderId: "308024920035",
  appId: "1:308024920035:web:6bb94d6487a64ca8f102d6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()