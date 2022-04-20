// se importa funcion de router para testeo de cambios de vistas
import { changeView } from '../src/router.js';
// se indica mock de funciones de firebase para correr test
jest.mock('../src/firebase-init.js');

// se crea vista de prueba para test
const viewTest = () => {
  const formTestHtml = `
  <div id="textTest">Hola vista test</div>`;
  const divTest = document.createElement('div');
  divTest.innerHTML = formTestHtml;
  return divTest;
};

// se agrega vista de test a componente para llamar la funcion changeView
const componentsTest = {
  signup: viewTest,
};

// se realiza test a la funcion para verificar cambio de rutas
describe('ruteo', () => {
  it(' debería cargar el form al #/signup ', () => {
    document.body.innerHTML = '<section class="router-container" id="routers-container"></section>';
    changeView('#/signup', componentsTest);
    expect(document.getElementById('routers-container').textContent.trim()).toEqual('Hola vista test');
  });
});
