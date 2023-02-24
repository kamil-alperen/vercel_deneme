const firebase_app = require("firebase/app");
const firebase_database = require("firebase/database");
const firebase_auth = require("firebase/auth");

const initializeApp = firebase_app.initializeApp;
const getDatabase = firebase_database.getDatabase;
const getAuth = firebase_auth.getAuth;
const GoogleAuthProvider = firebase_auth.GoogleAuthProvider;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAapUdksXtHeLiJ6jcVItulrkEpuh17n1Y",
  authDomain: "vrproject-3ed7c.firebaseapp.com",
  databaseURL: "https://vrproject-3ed7c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vrproject-3ed7c",
  storageBucket: "vrproject-3ed7c.appspot.com",
  messagingSenderId: "396494021932",
  appId: "1:396494021932:web:5694cdd1823bc4299a7889",
  measurementId: "G-XQB4LNTQZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

/* exports.auth = auth;
exports.provider = provider;
exports.db = db; */

module.exports = {auth, provider, db};
