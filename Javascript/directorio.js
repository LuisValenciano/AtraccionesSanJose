const lugaresData = {
  museos: [
    {
      nombre: "Museo de los Niños",
      tipo: "Museo interactivo",
      ubicacion: "Antigua penitenciaría, San José",
      horario: "Lunes a Sábado: 9am - 5pm",
      precio: "₡4,000 adultos / ₡3,000 niños",
      descripcion: "Ofrece experiencias educativas, lúdicas y tecnológicas para niños y jóvenes. Combina ciencia, arte, historia y tecnología en una antigua prisión convertida.",
      enlace: "https://museocr.org/",
      imagen: "resources/Museo nacional.png"
    },
    {
      nombre: "Museo del Oro",
      tipo: "Museo arqueológico",
      ubicacion: "Plaza de la Cultura, San José",
      horario: "Lunes a Sábado: 9am - 4pm",
      precio: "₡5,000",
      descripcion: "Presenta una de las colecciones de oro precolombino más importantes de América. El museo está ubicado bajo tierra y representa una travesía cultural única.",
      enlace: "https://museosdelbancocentral.org/",
      imagen: "resources/Museo nacional.png"
    },
    {
      nombre: "Museo del Jade",
      tipo: "Museo antropológico",
      ubicacion: "Av. Central y Calle 13, San José",
      horario: "Todos los días: 8am - 5pm",
      precio: "₡6,000",
      descripcion: "El museo alberga la mayor colección de jade precolombino de América Latina. Su arquitectura moderna contrasta con las raíces indígenas que busca preservar y exponer.",
      enlace: "https://museodeljade.grupoins.com/",
      imagen: "resources/Museo nacional.png"
    }
  ],
  restaurantes: [
    {
      nombre: "Café Mundo",
      tipo: "Restaurante internacional",
      ubicacion: "Barrio Otoya, San José",
      horario: "Lunes a Sábado: 11am - 10pm",
      precio: "₡8,000 promedio",
      descripcion: "Ambiente bohemio con platos internacionales, pizzas artesanales y buen café. Ubicado en una casa antigua con encanto y áreas exteriores.",
      enlace: "https://www.facebook.com/CafeMundoCR/",
      imagen: "resources/Pinto.png"
    },
    {
      nombre: "Nuestra Tierra",
      tipo: "Comida típica",
      ubicacion: "Frente al Teatro Nacional",
      horario: "Todos los días: 7am - 9pm",
      precio: "₡6,000 promedio",
      descripcion: "Casados, olla de carne y más en un entorno rústico que celebra la tradición costarricense. Ideal para turistas y nacionales.",
      enlace: "https://www.facebook.com/nuestratierracr/",
      imagen: "resources/Pinto.png"
    },
    {
      nombre: "Silvestre",
      tipo: "Alta cocina costarricense",
      ubicacion: "Barrio Amón",
      horario: "Martes a Sábado: 6pm - 10:30pm",
      precio: "₡20,000 promedio",
      descripcion: "Restaurante de autor que transforma ingredientes locales en platos artísticos de alta cocina. Ideal para una experiencia sensorial única.",
      enlace: "https://www.restaurantesilvestre.com/",
      imagen: "resources/Pinto.png"
    }
  ],
  cultura: [
    {
      nombre: "Teatro Nacional",
      tipo: "Teatro histórico",
      ubicacion: "Avenida Central, San José",
      horario: "Lunes a Viernes: 9am - 4pm",
      precio: "₡10,000",
      descripcion: "Joyas del neoclásico con espectáculos nacionales e internacionales. Inaugurado en 1897, es símbolo de orgullo y cultura costarricense.",
      enlace: "https://teatronacional.go.cr/",
      imagen: "resources/Carroza.png"
    },
    {
      nombre: "Plaza de la Cultura",
      tipo: "Espacio urbano",
      ubicacion: "Centro de San José",
      horario: "Acceso libre",
      precio: "Gratis",
      descripcion: "Centro peatonal rodeado de museos, comercios, músicos callejeros y esculturas. Punto de encuentro clave para turistas y locales.",
      enlace: "https://www.tripadvisor.es/Attraction_Review-g309293-d304313-Reviews-Plaza_de_la_Cultura-San_Jose_San_Jose_Metro_Province_of_San_Jose.html",
      imagen: "resources/Carroza.png"
    },
    {
      nombre: "Servicios Sexuales SJ Centro",
      tipo: "Entretenimiento adulto",
      ubicacion: "Centro histórico, San José",
      horario: "Todos los días: 7pm - 3am",
      precio: "Desde ₡25,000",
      descripcion: "Área popular por sus servicios para adultos. Se recomienda precaución. Atrae a visitantes por su ambiente nocturno y vida urbana intensa.",
      enlace: "",
      imagen: "resources/Carroza.png"
    }
  ]
};

// Variables de estado
let paginaActual = 0;
let categoriaSeleccionada = "";
let ultimaDireccion = "derecha";

// Mostrar lugares por categoría
function mostrarLugares(categoria) {
  categoriaSeleccionada = categoria;
  paginaActual = 0;
  ultimaDireccion = "derecha";

  document.getElementById("categorias").style.display = "none";
  document.getElementById("lugares").style.display = "flex";
  document.getElementById("navegacion").classList.add("activa");
  document.getElementById("volver-btn").style.display = "block";

  // Mostrar imagen principal de la categoría
  const imagenCategoria = lugaresData[categoriaSeleccionada][0].imagen;
  document.getElementById("imagen-categoria").innerHTML = `
    <div class="imagen-categoria-banner" style="background-image: url('${imagenCategoria}')"></div>
  `;

  renderizarLugares();
  renderizarPaginador();
}

// Volver a categorías
function volverACategorias() {
  document.getElementById("categorias").style.display = "flex";
  document.getElementById("lugares").style.display = "none";
  document.getElementById("navegacion").classList.remove("activa");
  document.getElementById("volver-btn").style.display = "none";
  document.getElementById("imagen-categoria").innerHTML = "";
}

// Render ficha
function renderizarLugares() {
  const contenedor = document.getElementById("lugares");
  contenedor.innerHTML = "";

  const lugar = lugaresData[categoriaSeleccionada][paginaActual];
  const animacion = ultimaDireccion === "izquierda" ? "slideInLeft" : "slideInRight";

  const card = document.createElement("div");
  card.className = "lugar-card";
  card.style.animation = `${animacion} 0.5s ease-out`;

  card.innerHTML = `
    <h3>${lugar.nombre}</h3>
    <p><i class="fas fa-info-circle"></i> <strong>Tipo:</strong> ${lugar.tipo}</p>
    <p><i class="fas fa-map-marker-alt"></i> <strong>Ubicación:</strong> ${lugar.ubicacion}</p>
    <p><i class="fas fa-clock"></i> <strong>Horario:</strong> ${lugar.horario}</p>
    <p><i class="fas fa-money-bill-wave"></i> <strong>Precio:</strong> ${lugar.precio}</p>
    <p>${lugar.descripcion}</p>
    <a href="${lugar.enlace}" target="_blank">Visitar sitio</a>
  `;

  contenedor.appendChild(card);
}

// Paginador dinámico
function renderizarPaginador() {
  const ul = document.getElementById("paginador");
  ul.innerHTML = "";

  const total = lugaresData[categoriaSeleccionada]?.length || 0;

  for (let i = 0; i < total; i++) {
    const li = document.createElement("li");
    li.classList.toggle("active", i === paginaActual);
    li.onclick = () => {
      ultimaDireccion = i > paginaActual ? "derecha" : "izquierda";
      paginaActual = i;
      renderizarLugares();
      renderizarPaginador();
    };
    ul.appendChild(li);
  }
}

// Cambiar entre fichas
function cambiarPagina(direccion) {
  const total = lugaresData[categoriaSeleccionada]?.length || 0;
  const nueva = paginaActual + direccion;

  if (nueva < 0 || nueva >= total) return;

  ultimaDireccion = direccion > 0 ? "derecha" : "izquierda";
  paginaActual = nueva;
  renderizarLugares();
  renderizarPaginador();
}
