document.addEventListener('DOMContentLoaded', function() {
  // Inicializar todos los Swipers
  const swipers = document.querySelectorAll('.mySwiper');
  swipers.forEach(function(swiperContainer) {
    new Swiper(swiperContainer, {
      loop: true,
      navigation: {
        nextEl: swiperContainer.querySelector('.swiper-button-next'),
        prevEl: swiperContainer.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: swiperContainer.querySelector('.swiper-pagination'),
        clickable: true,
      },
    });
  });

  // Variables principales
  const tarjetas = document.querySelectorAll('.tarjeta');
  const inputBusqueda = document.querySelector('.search-form input[type="search"]');
  const mensaje = document.getElementById('sin-resultados');
  const tarjetasPorPagina = 3;
  let paginaActual = 1;

  // Función para mostrar tarjetas paginadas
  function mostrarTarjetas(pagina) {
    const inicio = (pagina - 1) * tarjetasPorPagina;
    const fin = inicio + tarjetasPorPagina;

    tarjetas.forEach((tarjeta, index) => {
      tarjeta.style.display = (index >= inicio && index < fin) ? 'block' : 'none';
    });
  }

  // Función para actualizar botones activos
  function actualizarBotones() {
    const botones = document.querySelectorAll('.page-btn');
    botones.forEach(btn => btn.classList.remove('active'));
    if (botones[paginaActual - 1]) {
      botones[paginaActual - 1].classList.add('active');
    }
  }

  // Función global para cambiar de página
  window.cambiarPagina = function(pagina) {
    paginaActual = pagina;
    mostrarTarjetas(pagina);
    actualizarBotones();
  }

  // Función de búsqueda
  inputBusqueda.addEventListener('input', () => {
    const valorBusqueda = inputBusqueda.value.toLowerCase().trim();
    let hayCoincidencias = false;

    tarjetas.forEach((tarjeta) => {
      const marca = tarjeta.getAttribute('data-marca').toLowerCase();

      if (marca.includes(valorBusqueda)) {
        tarjeta.style.display = 'block';
        tarjeta.classList.add('destacada');
        hayCoincidencias = true;
      } else {
        tarjeta.style.display = 'none';
        tarjeta.classList.remove('destacada');
      }
    });

    // Mostrar mensaje si no hay resultados
    if (!hayCoincidencias && valorBusqueda !== '') {
      mensaje.style.display = 'block';
    } else {
      mensaje.style.display = 'none';
    }
  });

  // Inicializar la vista
  mostrarTarjetas(paginaActual);
  actualizarBotones();
});
