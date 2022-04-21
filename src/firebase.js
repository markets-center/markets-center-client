import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { initializeApp as initializeAppAdmin } from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json");


const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  
})

// const firebaseConfig = {
//     apiKey: "AIzaSyBd565mZOzZapUa9YW7NrpptMFQU3X897E",
//     authDomain: "mc-pg-c9041.firebaseapp.com",
//     projectId: "mc-pg-c9041",
//     storageBucket: "mc-pg-c9041.appspot.com",
//     messagingSenderId: "421323402906",
//     appId: "1:421323402906:web:a3b8eb274456032f96f923"
//   };

//   const app = firebase.initializeApp(firebaseConfig)

const admin = initializeAppAdmin({
    credential: initializeAppAdmin.credential.cert(serviceAccount)
  });

const auth = app.auth();
export {admin, auth}
export default app;