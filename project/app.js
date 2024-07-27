import { addDoc, auth, collection, db, getDocs, onAuthStateChanged, signOut } from "./config/firebase.js";

const signUpEmail = document.getElementById("signUpE");
const signUpPassword = document.getElementById("signUpP");
const SignUP_btn = document.getElementById("SignUP-btn");
const signinPassword = document.getElementById("signinPassword");
const signinEmail = document.getElementById("signinEmail");
const Signin_btn = document.getElementById("Signin-btn");

const authinCon = document.getElementById("auth_container");
const signin_container = document.getElementById("signin_container");

const logoutContainer = document.getElementById("logoutContainer");
const userEmail = document.getElementById("userEmail");
const LogOut_btn = document.getElementById("LogOut_btn");

LogOut_btn.addEventListener("click", logOut);

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    window.location.pathname = "./login/login.html";
    // ...
    console.log("signout");
  }
});

function logOut() {
  signOut(auth)
    .then(() => {
      setTimeout(() => {
        window.location.pathname = "./login/login.html";
      }, 2000);
    })
    .catch((error) => {
      // An error happened.
    });
}

//LogOut_btn.addEventListener("click", logOut)

//Post Update Function here
const postBtn = document.getElementById("button-addon2");
const postInput = document.getElementById("postValInput");
const cardsContainerWrapper = document.querySelector(".cardsContainerWrapper");
const spinner = document.querySelector(".spinner-border");

const userPosts = [
  {
    id: 1,
    postText: "Hello this is my first comment",
  },
  {
    id: 2,
    postText: "Hello this is my first comment",
  },
  {
    id: 3,
    postText: "Hello this is my first comment",
  },
];
 async function getDocsPost(){
    const querySnapshot = await getDocs(collection(db, "posts"));
    if(querySnapshot){
      spinner.style.display = "none"
    }
    const userPost = [];
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        postText: doc.data().postText,
        img: doc.data().img
      }
      userPost.push(obj)
    });
    return userPost

  }
 async function renderPost() {
   const postReturn = await getDocsPost();
    console.log("postReturn", postReturn);
  let singlePost = "";

  postReturn.reverse().forEach((element) => {
    singlePost += `
    <div class="card" style="width: 100%">
    <div class="card-body">
    <p class="card-text">
    ${
      element.postText
    }
    </p>
    </div>
    <img
      src="https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww"
      class="card-img-top"
      alt="..."
    />
             </div>`;
  });
  cardsContainerWrapper.innerHTML = singlePost;
}
renderPost();
const postHandler = async () => {
  console.log(postInput.value);
  try {
    const docRef = await addDoc(collection(db, "posts"), {
     postText: postInput.value,
     img: ""
    });
  
    console.log("Document written with ID: ", docRef.id);
    postInput.value = ""
    renderPost()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
};

postBtn.addEventListener("click", postHandler);
