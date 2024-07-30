import { auth, createUserWithEmailAndPassword } from "../config/firebase.js";

const signUpE = document.getElementById("signUpE")
const signUpP = document.getElementById("signUpP")
const loginBtn = document.getElementById("loginBtn")

const SignupBtn = document.getElementById("SignUP-btn")

function signupHandler(){
const email = signUpE.value
    const password = signUpP.value
  SignupBtn.textContent = "Please wait"

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log('user',user);
    setTimeout(()=>{
        window.location.pathname = "../login/login.html"
    })
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage)
  })
}

SignupBtn.addEventListener("click", signupHandler)

//Already Hava an account

loginBtn.addEventListener("click",()=>{
    window.location.pathname ="../login/login.html"

})