// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMLx_H_uGMc_ysPi2otuHpuAD07BcDOkg",
  authDomain: "thingyan-promotion-id.firebaseapp.com",
  projectId: "thingyan-promotion-id",
  storageBucket: "thingyan-promotion-id.firebasestorage.app",
  messagingSenderId: "933415515635",
  appId: "1:933415515635:web:2e45597e170cd9c7b74e86",
  measurementId: "G-62SL9MD8RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };