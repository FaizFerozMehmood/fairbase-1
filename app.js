import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 import { getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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


const logoutContainer = document.getElementById("logoutContainer")
const userEmail = document.getElementById('userEmail')
const LogOut_btn = document.getElementById('LogOut_btn')




SignUP_btn.addEventListener('click',creatingUserAccount)
Signin_btn.addEventListener('click',signIn)
LogOut_btn.addEventListener('click',logOut)


onAuthStateChanged(auth, (user) => {
    if (user) {
          authinCon.style.display="none";
          logoutContainer.style.display="block"
          userEmail.innerText=user.email
          signin_container.style.display="none"
          

      const uid = user.uid;
      // ...
    } else {
       authinCon.style.display="block";
          logoutContainer.style.display="none"
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
   function logOut(){
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

   }
 
