// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwDG7fkUl0JoMTclIuxo6UNhCiAWPNRKs",
  authDomain: "restaurant-management-ap-6541b.firebaseapp.com",
  databaseURL: "https://restaurant-management-ap-6541b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "restaurant-management-ap-6541b",
  storageBucket: "restaurant-management-ap-6541b.appspot.com",
  messagingSenderId: "93244587313",
  appId: "1:93244587313:web:791553da4f15f07b4c8410",
  measurementId: "G-BCT8K7ESHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

export default {app, db, analytics}