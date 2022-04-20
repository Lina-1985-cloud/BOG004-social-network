// se importa funciones de firebase y de notificacion
import { authenticatorGoogleEvent } from '../controllers/signup.controller.js';
import { loginBtnEvent } from '../controllers/login.controller.js';
import { showNotification } from '../controllers/alerts.controllers.js';

// se crea template de login
export default () => {
  const viewLogin = `
  <section class='bg-cont'>
      <form class='log-sig'>
          <section class='log-sig-logobemusic'>
              <h1 class='log-sig-title'>BeMusic</h1>
              <img src='./assets/images/logobemusic.png' alt='logoBeMusic'></img>
          </section>
          <section class='log-sig-container'>
              <section class='log-sig-inputs'>
                  <input id='email' type='email' value='' placeholder='Correo'/>
                  <input id='pass' type='password' value='' placeholder='Contraseña'/>
              </section>
              <button type='button' id='login-btn' class='log-sig-btn'>Iniciar sesión</button>
              <p class='log-sig-line'><span>O</span></p>
              <section class='log-sig-google'>
                  <p>Iniciar sesión con</p>
                  <img id='login-google' src='./assets/images/logogoogle.png' alt='logoGoogle'></img>
              </section>
              <section class = 'log-sig-load'>
                  <p>¿No tienes cuenta?</p>
                  <button type='button' id='signup-btn-load' class='log-sig-btn-2'>Regístrate</button>
              </section>
          </section>
      </form>
  </section>`;
  const divElementLogin = document.createElement('div');
  divElementLogin.innerHTML = viewLogin;

  // se agrega evento click a boton continuar para iniciar sesion
  const loginBtn = divElementLogin.querySelector('#login-btn');
  loginBtn.addEventListener('click', () => {
    const loginEmail = divElementLogin.querySelector('#email').value;
    const loginPassword = divElementLogin.querySelector('#pass').value;
    loginBtnEvent(loginEmail, loginPassword)
      .then(() => {
        window.sessionStorage.setItem('islogged', 'true');
        window.location.hash = '#/wall'; // se cambia ventana cuando el usuario se loguea con cuenta
      })
      .catch((error) => {
        const errorMessage = error.message;
        showNotification(errorMessage);
      });
  });

  // se agrega evento click a imagen para autenticar usuario con google
  const authGoogle = divElementLogin.querySelector('#login-google');
  authGoogle.addEventListener('click', () => {
    authenticatorGoogleEvent()
      .then(() => {
        window.sessionStorage.setItem('islogged', 'true');
        window.location.hash = '#/wall'; // se cambia ventana cuando autentica cuenta
      }).catch((error) => {
        const errorMessage = error.message;
        showNotification(errorMessage);
      });
  });

  // se agrega evento click a boton de signup
  const btnRegistrar = divElementLogin.querySelector('#signup-btn-load');
  btnRegistrar.addEventListener('click', () => {
    window.location.hash = '#/signup'; // se cambia ventana a signup para registrarse
  });

  return divElementLogin;
};
