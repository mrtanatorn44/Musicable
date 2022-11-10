import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID, FIREBASE_MEASUREMENTID } from '@env'

const firebaseConfig = {
  apiKey: "AIzaSyA8HZnYz0xfUAKsQ7rM47RskvruDPzjRwU",
  authDomain: "mobile-week09-265cb.firebaseapp.com",
  projectId: "mobile-week09-265cb",
  storageBucket: "mobile-week09-265cb.appspot.com",
  messagingSenderId: "998063791684",
  appId: "1:998063791684:web:412d41d539d887bb7d2611",
  measurementId: "G-2FHLRXFMYC"

  // apiKey:             FIREBASE_APIKEY,
  // authDomain:         FIREBASE_AUTHDOMAIN,
  // projectId:          FIREBASE_PROJECTID,
  // storageBucket:      FIREBASE_STORAGEBUCKET,
  // messagingSenderId:  FIREBASE_MESSAGINGSENDERID,
  // appId:              FIREBASE_APPID,
  // measurementId:      FIREBASE_MEASUREMENTID
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
