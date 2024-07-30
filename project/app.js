import { addDoc, auth, collection, db, getDocs, getDownloadURL, onAuthStateChanged, ref, signOut, storage, uploadBytesResumable } from "./config/firebase.js";

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
  let isUser = false;
  LogOut_btn.textContent = "Please wait"
   setTimeout(()=>{
       isUser = true
       window.location.pathname = './login/login.html'
   }, 3000)
  if(isUser){
  signOut(auth)
    .then(() => {
     
    })
    .catch((error) => {
      // An error happened.
    });
  }
}

//LogOut_btn.addEventListener("click", logOut)

//Post Update Function here
const postBtn = document.getElementById("button-addon2");
const postInput = document.getElementById("postValInput");
const cardsContainerWrapper = document.querySelector(".cardsContainerWrapper");
const spinner = document.querySelector(".loader2");
const inputFile = document.getElementById("inputFile");
const loader1 = document.querySelector(".loader");

//Upload Photos Function

const uploadImgHandler =async (file)=>{
return  new Promise(async(resolve, reject)=>{
    const storageRef = await ref(storage, `images/${Date.now()}` + file.name);

    const uploadTask =  uploadBytesResumable(storageRef, file);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        loader1.style.display = "flex"
        loader1.style.justifyContent = "center"
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.log("error",error);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          resolve(downloadURL)
          loader1.style.display = "none"
        });
      }
    );
  })
 

}

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
    if(element.img){
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
      src="${element.img}"
      class="card-img-top"
      alt="..."
    />
             </div>`;
    }else{
      singlePost += `
      <div class="card" style="width: 100%">
      <div class="card-body">
      <p class="card-text">
      ${
        element.postText
      }
      </p>
      </div>
               </div>`;
    }
  });
  cardsContainerWrapper.innerHTML = singlePost;
}
renderPost();
const postHandler = async () => {
const file =inputFile?.files[0]?.name;
  console.log(postInput.value);
  let userImg
  if(file){
   userImg = await uploadImgHandler(inputFile?.files[0]);
  if(userImg){
    console.log(userImg);
  }
  }
  try {
    const docRef = await addDoc(collection(db, "posts"), {
     postText: postInput.value,
     img: userImg ? userImg : ""
    });
  
    console.log("Document written with ID: ", docRef.id);
    postInput.value = ""
    renderPost()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
};

postBtn.addEventListener("click", postHandler);
