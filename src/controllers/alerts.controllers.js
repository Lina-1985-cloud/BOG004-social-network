// funcion para mostrar notificacion
export const showNotification = (message) => {
  const notification = document.querySelector('.notification');

  notification.textContent = message;
  notification.style.display = 'none';
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
    notification.textContent = '';
  }, 2000);
};
