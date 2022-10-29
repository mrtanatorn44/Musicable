// Import firebase
import firebase from 'firebase';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANZa4iUglavADGnlcRjqCcDcLc7yErHVk",
  authDomain: "ourplace-dab47.firebaseapp.com",
  projectId: "ourplace-dab47",
  storageBucket: "ourplace-dab47.appspot.com",
  messagingSenderId: "985319990760",
  appId: "1:985319990760:web:fd39b8908701bc9afcf05d",
  measurementId: "G-RSZKL8RRFR"
};  

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp;