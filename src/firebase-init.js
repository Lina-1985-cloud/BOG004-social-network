// https://firebase.google.com/docs/web/setup#available-libraries

// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

// se importan Funciones de AUTH
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

// se importan funciones de FIRESTORE
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  orderBy,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

// Your web app's Firebase configuration is:
const firebaseConfig = {
  apiKey: 'AIzaSyAnavN3sX6NxYjswJ7HQ2kqXFHgQqI-W_g',
  authDomain: 'red-social-d483a.firebaseapp.com',
  projectId: 'red-social-d483a',
  storageBucket: 'red-social-d483a.appspot.com',
  messagingSenderId: '761140940741',
  appId: '1:761140940741:web:2a4684b62d1419a0ad85ac',
  measurementId: 'G-ESZG030Z67',
};

// inicializacion de firebase y data base
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// se exportan funciones de AUTH y FIRESTORE
export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
  collection,
  getFirestore,
  addDoc,
  getDocs,
  getDoc,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
};

// se declara a google como nuestro proveedor
export const provider = new GoogleAuthProvider();
