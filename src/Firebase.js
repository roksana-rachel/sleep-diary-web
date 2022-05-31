import firebase from 'firebase/compat/app';
import 'firebase/auth';
import firestore from 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCaqCnVtqdhnRDjSlkN_hpQZKH8Pv8I4Sc",
  authDomain: "sleepdiary-540ce.firebaseapp.com",
  projectId: "sleepdiary-540ce",
  storageBucket: "sleepdiary-540ce.appspot.com",
  messagingSenderId: "853255738856",
  appId: "1:853255738856:web:0472bf192cb929cd31c05d"
})

export default app;
export const auth = app.auth();
export const db = firebase.firestore();