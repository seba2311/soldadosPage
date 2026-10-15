
async function cargarCarruselKick() {
    const contenedor = document.getElementById('imagenesCarrusel');
    const carrusel = document.getElementById('carruselKick');
  
    if (!contenedor || !carrusel) {
      console.error('No se encontró el contenedor del carrusel.');
      return;
    }
  
    try {
      const respuesta = await fetch('./imagenes.json');
  
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
  
      const imagenes = await respuesta.json();
      contenedor.replaceChildren();
  
      imagenes.forEach((ruta, indice) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
  
        if (indice === 0) {
          item.classList.add('active');
        }
  
        const imagen = document.createElement('img');
        imagen.src = ruta;
        imagen.alt = `Fotografía ${indice + 1} del entrenamiento`;
        imagen.className = 'd-block w-100';
        imagen.loading = indice === 0 ? 'eager' : 'lazy';
  
        item.appendChild(imagen);
        contenedor.appendChild(item);
      });
  
      const controles = carrusel.querySelectorAll(
        '.carousel-control-prev, .carousel-control-next'
      );
  
      controles.forEach(control => {
        control.hidden = imagenes.length < 2;
      });
  
      if (imagenes.length > 1 && window.bootstrap) {
        bootstrap.Carousel.getOrCreateInstance(carrusel, {
          interval: 5000,
          ride: 'carousel',
          wrap: true
        });
      }
    } catch (error) {
      console.error('Error al cargar el carrusel:', error);
      contenedor.textContent = 'No se pudo cargar la galería.';
    }
  }
  
  cargarCarruselKick();
  