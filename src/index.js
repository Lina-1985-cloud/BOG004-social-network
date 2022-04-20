// se importan vistas
import Signup from './views/signup.js';
import Login from './views/login.js';
import Wall from './views/wall.js';
import Error404 from './views/404.js';

// se crea componente de vistas
const components = {
  signup: Signup,
  login: Login,
  wall: Wall,
  error404: Error404,
};
export { components };
