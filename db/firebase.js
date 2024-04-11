// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMEBxRDQ0Fpuv2caucJxuNL03Xoye3Gn8",
  authDomain: "femepashidi-3c1c5.firebaseapp.com",
  projectId: "femepashidi-3c1c5",
  storageBucket: "femepashidi-3c1c5.appspot.com",
  messagingSenderId: "928790446923",
  appId: "1:928790446923:web:76e4c87ce6f96a044e1ece"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const server = `https://femepashidi.siradiacion.com.mx/`
// const server = `http://localhost:3000/`

// const server = `https://femepashidiapi.onrender.com/`


module.exports = {db,server}



