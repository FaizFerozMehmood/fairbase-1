  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import {
     getFirestore,
    collection,
    doc,
     addDoc,
     getDocs,
     deleteDoc,

   } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  let numbersCollection = collection(db, "numbers");
  let todosCollection = collection(db, "todos");
  
  const todo_input = document.getElementById("todo_input");
  const add_todo = document.getElementById("add_todo");
  const todo_list = document.getElementById("todo_list");
  
  getTodosFromDb();
  add_todo.addEventListener("click", addTodoToDb);
  
  async function addTodoToDb() {
    try {
      const obj = {
        todo: todo_input.value,
        createdAt: new Date().toISOString(),
      };
  
      const docRef = await addDoc(todosCollection, obj);
      getTodosFromDb();
      todo_input.value = "";
    } catch (e) {
      console.log(e);
    }
  }
  
  async function getTodosFromDb() {
    try {
      const querySnapshot = await getDocs(todosCollection);
      todo_list.innerHTML = "";
      querySnapshot.forEach((doc) => {
        console.log("Doc=>", doc.id);
        const { todo, createdAt } = doc.data();
        const ele = `<li id = ${doc.id}>${todo} -  ${new Date(
          createdAt
        ).toLocaleDateString()}</li>`;
        todo_list.innerHTML += ele;
      });
  
      todo_list.childNodes.forEach((li) =>
        li.addEventListener("click", deleteTodo)
      );
    } catch (e) {
      console.log(e);
    }
  }
  
  async function deleteTodo() {
    try {
      const docId = this.id;
      const docCollection = doc(db, "todos", docId);
      const docRef = await deleteDoc(docCollection);
      getTodosFromDb()
      console.log("Document deleted=>", docRef);
    } catch (e) {
      console.log(e);
    }
  }
  addNumberToDB();
async function addNumberToDB() {
  try {
    const docRef = await addDoc(numbersCollection, {
      number: Math.round(Math.random() * 1000000),
    });

    console.log("docRef=>", docRef);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}