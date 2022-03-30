// se importa funcion del observador de status y cerrar sesion y notificacion
import {
  currentUser,
  signOutUser,
  createPublication,
  readPublication,
  onReadPublication,
  deletePublication,
} from '../controllers/wall.controller.js';
import { showNotification } from '../controllers/alerts.controllers.js';

// se crea template de wall
export default () => {
  const wall = `
  <section class='wall'>
    <header>
        <nav class='wall-nav'>
            <img src='./assets/images/logobemusic.png' alt='logoBeMusic'></img>
            <section class = 'wall-nav-container'>
                <picture class='wall-nav-pic'>
                    <i class='fa-solid fa-user' id='userpic'></i>
                </picture>
                <i class='fa-solid fa-arrow-right-from-bracket' id='signout' ></i>
            </section>
        </nav>
    </header>
    <section class='wall-categories'>
        <h2 class='wall-categ-title'>Publicar</h2>
        <section class='wall-categ-container' id='wall-categ-container'></section>
    </section>
    <main class='wall-posts'>
          <form class='modal' id='modal-form'>
            <section class = 'modal-container'>
              <section class='modal-container-header'>
                <h2>Crear Publicación</h2>
                <section class='modal-container-category'>
                  <p id='modal-category'>Categoría</p>
                  <i id='modal-container-close' class='fa-solid fa-circle-xmark'></i>
                </section>
              </section>
              <section class='modal-container-user'>
                <section class='modal-container-icono'>
                  <i class='fa-solid fa-user' id='userpic'></i>
                </section>
                <p class='modal-user-name'>nombre Usuario</p>
              </section>
              <section class='modal-text-content'>
                <textarea type='text' id='input-post' placeholder='Comparte tú evento o canción'  maxlength='200' required></textarea>
              </section>
                <button type='submit' class='modal-btn-post-inactive' id='modal-btn-publish'>Publicar</button>
            </section>
          </form>
        <section class='wall-posts-container'>
        </section>
    </main>
  </section>`;

  const divElementWall = document.createElement('div');
  divElementWall.innerHTML = wall;
  const wallControllerUserInfo = currentUser();
  console.log(wallControllerUserInfo, 'Info usuario en muro');

  // funcion para verificar estado de url de foto
  const photoCondition = (userInfo, catchUserPicHTML) => {
    const userPicHTML = catchUserPicHTML;
    if (userInfo === null || userInfo.photoURL === null) {
      userPicHTML.innerHTML = '<i class=\'fa-solid fa-user\' id=\'userpic\'></i>';
    } else {
      userPicHTML.innerHTML = `<img src='${userInfo.photoURL}' alt='user-pic'></img>`;
    }
  };

  // funcion para cambiar icono por foto
  const avatarChange = (userInfo) => {
    const catchUserPicHTML = divElementWall.querySelector('.wall-nav-pic');
    if (userInfo !== undefined && userInfo !== null) {
      photoCondition(userInfo, catchUserPicHTML);
    }
  };
  // se invoca a la funcion para cambiar icono por foto
  avatarChange(wallControllerUserInfo);

  const musicCategories = {
    type: ['Rock', 'Pop', 'Romántica', 'Reggaeton', 'Electrónica', 'Bailable', 'Country', 'Salsa'],
  };

  // funcion para crear estructura de filtros en html
  const createCategoriesStructure = (mCategories) => {
    // declaracion variable para agregar generos musicales
    const musicCategoriesSec = divElementWall.querySelector('#wall-categ-container');
    let musicValues = '';
    // ciclo para crear botones de generos musicales
    mCategories.forEach((value, index) => {
      musicValues += `<button type='button' class='wall-categ-button' id='${value}${index}' value='${value}'>${value}</button>`;
    });
    // inserta estructura filtros
    musicCategoriesSec.innerHTML = musicValues;
  };
  // se invoca a la funcion createCategoriesStructure para crear opcion de publicacion
  createCategoriesStructure(musicCategories.type);

  // Función Open Modal
  const openModal = (userInfo) => {
    const categories = divElementWall.querySelectorAll('.wall-categ-button');
    const modalPublication = divElementWall.querySelector('.modal');
    const pCategory = divElementWall.querySelector('#modal-category');
    const catchUserPicHTMLmodal = divElementWall.querySelector('.modal-container-icono');
    const catchUserEmail = divElementWall.querySelector('.modal-user-name');
    categories.forEach((elementCategory) => {
      elementCategory.addEventListener('click', (e) => {
        e.preventDefault();
        pCategory.innerHTML = elementCategory.value;
        photoCondition(userInfo, catchUserPicHTMLmodal);
        const userName = userInfo.email;
        const userNameString = userName.toString().split('@');
        catchUserEmail.innerHTML = userNameString[0];
        modalPublication.classList.add('modal--show');
      });
    });
  };
  openModal(wallControllerUserInfo);

  // Función Close Modal
  const closeModal = () => {
    const modalPublication = divElementWall.querySelector('.modal');
    const modalClose = divElementWall.querySelectorAll('#modal-container-close');
    modalClose.forEach((elementCategory) => {
      elementCategory.addEventListener('click', (e) => {
        e.preventDefault();
        modalPublication.classList.remove('modal--show');
      });
    });
  };
  closeModal();

  // Función para crear publicación
  const publish = () => {
    const modalPublication = divElementWall.querySelector('.modal');
    const formPublish = divElementWall.querySelector('#modal-form');
    formPublish.addEventListener('submit', (e) => {
      e.preventDefault();
      const publication = formPublish['input-post'];
      const publicationGenere = divElementWall.querySelector('#modal-category');
      createPublication(publication.value, publicationGenere.textContent);
      formPublish.reset();
      modalPublication.classList.remove('modal--show');
    });
  };
  publish();

  // Funcion para leer publicaciones
  const postsManagement = () => {
    const postContainer = divElementWall.querySelector('.wall-posts-container');
    const querySnapshot = readPublication();
    onReadPublication((snapShopResult) => {
      let postStructure = '';
      snapShopResult.forEach((doc) => {
        const post = doc.data();
        postStructure += `
          <section class='post'>
            <p>${post.inputPost}</p>
            <p>${post.genere}</p>
            <button class='post-btn-delete-publication' data-publicationid='${doc.id}'>Eliminar</button>
          </section>
        `;
      });
      postContainer.innerHTML = postStructure;

      // funcion para eliminar post
      const postRemover = () => {
        const deleteButton = divElementWall.querySelectorAll('.post-btn-delete-publication');
        // console.log(deleteButton);
        deleteButton.forEach((btn) => {
          btn.addEventListener('click', ({ target: { dataset } }) => {
            deletePublication(dataset.publicationid);
          });
        });
      };
      postRemover();
    });
    onReadPublication(querySnapshot);
  };
  postsManagement();

  // Se agrega evento click a boton de cerrar sesión
  const signoutBtn = divElementWall.querySelector('#signout');
  signoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signOutUser()
      .then(() => {
        window.sessionStorage.setItem('islogged', 'false');
        window.location.hash = '#/';
      })
      .catch((error) => {
        showNotification(error);
      });
  });

  return divElementWall;
};
