import * as UI from './interfaz.js';
import { API } from './api.js'

UI.formularioBuscar.addEventListener('submit', (e) => {
  e.preventDefault();
  //Obtener datos del formulario
  const artista = document.querySelector('#artista').value,
    cancion = document.querySelector('#cancion').value;
  if (artista === '' || cancion === '') {
    //Si el usuario deja los campos vacios
    UI.divMensaje.innerHTML = 'Error... Todos los campos son obligatorios';
    UI.divMensaje.classList.add('error');
    setTimeout(() => {
      UI.divMensaje.innerHTML = '';
      UI.divMensaje.classList.remove('error');
    }, 3000);
  } else {
    //El formulario esta completo
    const api = new API(artista, cancion);
    api.consultarAPI()
      .then(data => {
        if (data.respuesta.lyrics) {
          //La cancion existe
          const letra = data.respuesta.lyrics;
          UI.divResultado.textContent = letra;
        } else {
          //La cancion no existe
          UI.divMensaje.innerHTML = 'Esta canción no existe';
          UI.divMensaje.classList.add('error');
          setTimeout(() => {
            UI.divMensaje.innerHTML = '';
            UI.divMensaje.classList.remove('error');
            UI.formularioBuscar.reset();
          }, 3000);
        }
      })
  }
});