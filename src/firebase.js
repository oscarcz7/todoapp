import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApDh301Ud37FnkNdSKaVZurQvb0UuTM2U",
  authDomain: "udla-todoapp.firebaseapp.com",
  projectId: "udla-todoapp",
  storageBucket: "udla-todoapp.appspot.com",
  messagingSenderId: "956973587197",
  appId: "1:956973587197:web:09de7a0cd1601d52133c94",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();
export { db, auth, analytics };
