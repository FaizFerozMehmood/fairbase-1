// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 import { getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
// console.log(app);

const auth = getAuth(app);
// console.log(auth);


const signUpEmail = document.getElementById("signUpE");
const signUpPassword = document.getElementById("signUpP");
const SignUP_btn = document.getElementById("SignUP-btn")
const signinPassword = document.getElementById("signinPassword");
const signinEmail = document.getElementById("signinEmail");
const Signin_btn = document.getElementById("Signin-btn")

const authinCon = document.getElementById("auth_container")

const signin_container = document.getElementById("signin_container")




SignUP_btn.addEventListener('click',creatingUserAccount)
Signin_btn.addEventListener('click',signIn)


onAuthStateChanged(auth, (user) => {
    if (user) {
          
        // console.log("loggedIn");
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      
        // console.log("User is signed out");
      // ...
    }
  });
  function creatingUserAccount(){
    console.log("email",signUpEmail.value);
    console.log("pasword",signUpPassword.value);
    createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage)
  })


  }
  function signIn(){
    // console.log(signinEmail.value);
    // console.log(signinPassword.value);
    signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
    

  }
