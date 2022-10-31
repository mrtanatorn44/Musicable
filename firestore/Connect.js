import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID, FIREBASE_MEASUREMENTID } from '@env'

const firebaseConfig = {
  apiKey:             FIREBASE_APIKEY,
  authDomain:         FIREBASE_AUTHDOMAIN,
  projectId:          FIREBASE_PROJECTID,
  storageBucket:      FIREBASE_STORAGEBUCKET,
  messagingSenderId:  FIREBASE_MESSAGINGSENDERID,
  appId:              FIREBASE_APPID,
  measurementId:      FIREBASE_MEASUREMENTID
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
