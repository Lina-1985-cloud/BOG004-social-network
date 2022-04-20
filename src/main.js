// se importa funcion de router para cambios de vistas
import { changeView } from './router.js';

// funcion init para cargar vistas y eventos dentro de las vistas
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
