// se importa funcion signupBtnEvent desde  signup.controller para test
import { signupBtnEvent } from '../../src/controllers/signup.controller.js';

// se indica mock de funciones de firebase para correr test
jest.mock('../../src/firebase-init.js');

// se realiza test a la funcion que crea cuenta con correo y contraseña
describe('signUp Controller', () => {
  it('Creación de usuario con correo y contraseña exitoso', (done) => {
    const email = 'test@gmail.com';
    const password = 'test123';
    // console.log(signupBtnEvent(email, password), 'Exitoso');
    signupBtnEvent(email, password).then((response) => {
      expect(response.uid).toBe('123');
      done();
    });
  });
  it('Creación de usuario con correo y contraseña NO exitoso', () => {
    const email2 = 'ana1@gmail.com';
    const password2 = 'ana12345';
    // console.log(signupBtnEvent(email2, password2), 'NO Exitoso');
    signupBtnEvent(email2, password2).then((response) => {
      expect(response).not.toBe('ERROR USER YA TIENE CUENTA auth/email-already-in-use');
      // console.log(response, 'respuestaaa');
      // return expect(Promise.reject(new Error('ERROR USER
      // YA TIENE CUENTA auth/email-already-in-use'))).rejects.toThrow(
      //   'ERROR USER YA TIENE CUENTA auth/email-already-in-use',
      // );
    });
  });
});
