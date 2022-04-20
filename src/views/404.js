// se crea template de 404
export default () => {
  const diferent = `
  <p>NO ENCONTRADO</p>`;

  const divElement404 = document.createElement('div');
  divElement404.innerHTML = diferent;

  return divElement404;
};
