import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore,collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import {getStorage, ref, uploadBytesResumable, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"


const firebaseConfig = {
  apiKey: "AIzaSyCQBMb6fcyz6qxqGcRaXrwkpXn-qqv-Avc",
  authDomain: "first-login-c09e7.firebaseapp.com",
  projectId: "first-login-c09e7",
  storageBucket: "first-login-c09e7.appspot.com",
  messagingSenderId: "584925004041",
  appId: "1:584925004041:web:388ac7ce14506347f813d8",
  measurementId: "G-1869EV3757"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();


export {auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,db
 , collection, addDoc,getDocs, storage, ref, uploadBytesResumable, getDownloadURL
}
