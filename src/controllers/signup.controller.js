// se importa funciones de firebase para autenticacion y creacion de usuarios y de notificacion
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  provider,
} from '../firebase-init.js';

// funcion para crear usuario con correo y contraseña
export const signupBtnEvent = (signupEmail, signupPassword) => {
  const auth = getAuth();
  const email = signupEmail;
  const password = signupPassword;
  return createUserWithEmailAndPassword(auth, email, password);
};

// funcion para autenticar usuario con google
export const authenticatorGoogleEvent = () => {
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};
