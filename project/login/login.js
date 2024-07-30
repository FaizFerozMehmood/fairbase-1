import { auth, signInWithEmailAndPassword  } from "../config/firebase.js";

const signupBtn = document.getElementById("signupBtn")
const emailVal = document.getElementById("email");
const passwordVal = document.getElementById("password");
const signInHandlerBtn = document.getElementById("signInHandlerBtn");
signupBtn.addEventListener("click",()=>{
  // signupBtn.textContent="Please wait"
    window.location.pathname ="../signup/signup.html"
    
});


 
function signIn(){
    // console.log(signinEmail.value);
    // console.log(signinPassword.value);
    const email = emailVal.value;
    const password = passwordVal.value;
    signInHandlerBtn.textContent = "Please wait"

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("userLogin",user);

    setTimeout(()=>{
      signupBtn.textContent = "Please wait"

      window.location.href = "../index.html"
    },2000)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}


signInHandlerBtn.addEventListener("click", signIn)