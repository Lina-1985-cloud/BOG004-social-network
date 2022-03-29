// se importan funciones de firebase y de notificacion
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  collection,
  db,
  addDoc,
  getDocs,
  onSnapshot,
} from '../firebase-init.js';

// funcion para conseguir info user
export const currentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user === null) {
    window.location.hash = '#/';
  } else {
    window.location.hash = '#/wall';
  }
  return user;
};

// funcion para cerrar sesion
export const signOutUser = () => {
  const auth = getAuth();
  const signOutEvent = signOut(auth);
  return signOutEvent;
};

// funcion observador fanny
export const watcher = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    let uid;
    if (user) {
      uid = user.uid;
      console.log(uid, 'id del usuario');
    } else {
      uid = null;
    }
    return uid;
  });
};

// export const observador = () => {
//   const auth = getAuth();
//   return onAuthStateChanged(auth, (user) => user);
// };

// Función para crear publicación
export const createPublication = (inputPost, genere) => {
  console.log(inputPost, genere);
  addDoc(collection(db, 'publications'), { inputPost, genere });
};

// Función para leer publicación
export const readPublication = () => {
  console.log('lista de publicaciones');
  return getDocs(collection(db, 'publications'));
};

// Función para leer publicación
export const onReadPublication = (querySnapshot) => {
  console.log('onReadPublication');
  return onSnapshot(collection(db, 'publications'), querySnapshot);
};
