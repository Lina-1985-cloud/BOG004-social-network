// importamos el componente de las vistas
import { components } from './index.js';

// funcion de condicion de cambio de rutas
const changeView = (route, component = components) => {
  const hash = route.split('/')[1];
  const sectionHTML = document.querySelector('#routers-container');
  sectionHTML.innerHTML = '';
  let sessionRoute;
  // console.log(window.sessionStorage.getItem('islogged'), 'session storage en router');
  switch (route) {
    case '':
    case ' ':
    case '#':
    case '#/':
      if (window.sessionStorage.getItem('islogged') === 'true' && window.sessionStorage.getItem('islogged') !== null) {
        sessionRoute = sectionHTML.appendChild(component.wall());
      } else {
        sessionRoute = sectionHTML.appendChild(component.login());
      }
      break;
    case '#/signup':
    case '#/wall':
      sessionRoute = sectionHTML.appendChild(component[hash]());
      break;
    default:
      sessionRoute = sectionHTML.appendChild(component.error404());
  }
  return sessionRoute;
};

export { changeView };
