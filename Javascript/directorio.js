// Estado
let paginaActual = 0;
let categoriaSeleccionada = "";
let ultimaDireccion = "derecha";

// Datos de lugares 
const lugaresData = {
  museos: [
    {
      nombre: "Museo de los Niños",
      tipo: "Museo interactivo",
      ubicacion: "Antigua penitenciaría, San José",
      horario: "Lunes a Sábado: 9am - 5pm",
      precio: "₡4,000 adultos / ₡3,000 niños",
      descripcion: "Exhibiciones educativas y lúdicas en ciencia, arte y cultura en un edificio histórico reconvertido.",
      enlace: "https://museocr.org/",
      imagen: "resources/Museo nacional.png"
    },
    {
      nombre: "Museo del Oro",
      tipo: "Museo arqueológico",
      ubicacion: "Plaza de la Cultura, San José",
      horario: "Lunes a Sábado: 9am - 4pm",
      precio: "₡5,000",
      descripcion: "Colección subterránea de oro precolombino que muestra el legado de los pueblos indígenas en América Central.",
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
    },
    {
      nombre: "Museo Nacional de Costa Rica",
      tipo: "Museo histórico",
      ubicacion: "Cuesta de Moras, San José",
      horario: "Martes a Domingo: 9am - 4:30pm",
      precio: "₡2,000 nacionales / ₡9,000 extranjeros",
      descripcion: "Explora la historia natural, arqueológica y política del país en este museo ubicado en un antiguo cuartel militar.",
      enlace: "https://www.museocostarica.go.cr",
      imagen: "resources/Museo nacional.png"
    },
    {
      nombre: "Museo de Arte Costarricense",
      tipo: "Museo de arte",
      ubicacion: "La Sabana, San José",
      horario: "Martes a Domingo: 9am - 4pm",
      precio: "Entrada gratuita",
      descripcion: "Presenta obras emblemáticas de artistas costarricenses desde el siglo XIX hasta la actualidad. Su edificio es una joya arquitectónica.",
      enlace: "https://www.mac.go.cr/",
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
      descripcion: "Ambiente bohemio con platos internacionales, pizzas artesanales y buen café.",
      enlace: "https://www.facebook.com/CafeMundoCR/",
      imagen: "resources/Pinto.png"
    },
    {
      nombre: "Nuestra Tierra",
      tipo: "Comida típica",
      ubicacion: "Frente al Teatro Nacional",
      horario: "Todos los días: 7am - 9pm",
      precio: "₡6,000 promedio",
      descripcion: "Casados, olla de carne y más en un entorno rústico que celebra la cultura tica.",
      enlace: "https://www.facebook.com/nuestratierracr/",
      imagen: "resources/Pinto.png"
    },
    {
      nombre: "Silvestre",
      tipo: "Alta cocina costarricense",
      ubicacion: "Barrio Amón",
      horario: "Martes a Sábado: 6pm - 10:30pm",
      precio: "₡20,000 promedio",
      descripcion: "Restaurante de autor que transforma ingredientes locales en platos artísticos. Una experiencia culinaria memorable.",
      enlace: "https://www.restaurantesilvestre.com/",
      imagen: "resources/Pinto.png"
    },
    {
      nombre: "La Esquina de Buenos Aires",
      tipo: "Parrilla argentina",
      ubicacion: "Barrio La California, San José",
      horario: "Todos los días: 12pm - 10pm",
      precio: "₡15,000 promedio",
      descripcion: "Famoso por sus cortes de carne y ambiente acogedor con inspiración argentina.",
      enlace: "https://www.facebook.com/laesquinacr/",
      imagen: "resources/Pinto.png"
    },
    {
      nombre: "Tin Jo",
      tipo: "Fusión asiática",
      ubicacion: "Calle 11, San José",
      horario: "Lunes a Sábado: 11am - 9pm",
      precio: "₡10,000 promedio",
      descripcion: "Variedad de cocinas asiáticas en un ambiente artístico y relajante. Excelente para vegetarianos.",
      enlace: "https://www.tinjo.com/",
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
      descripcion: "Obras nacionales e internacionales en un edificio neoclásico inaugurado en 1897. Visitas guiadas disponibles.",
      enlace: "https://teatronacional.go.cr/",
      imagen: "resources/Carroza.png"
    },
    {
      nombre: "Plaza de la Cultura",
      tipo: "Espacio urbano",
      ubicacion: "Centro de San José",
      horario: "Acceso libre",
      precio: "Gratis",
      descripcion: "Centro cultural rodeado de museos, arte callejero y movimiento urbano constante.",
      enlace: "https://es.wikipedia.org/wiki/Plaza_de_la_Cultura",
      imagen: "resources/Carroza.png"
    },
    {
      nombre: "Barrio Chino",
      tipo: "Zona cultural",
      ubicacion: "Calle 9, San José",
      horario: "Abierto todo el día",
      precio: "Gratis",
      descripcion: "Punto de encuentro para disfrutar de gastronomía, tiendas y arquitectura de estilo oriental.",
      enlace: "",
      imagen: "resources/Carroza.png"
    },
    {
      nombre: "Mercado Municipal de Artesanías",
      tipo: "Artesanía local",
      ubicacion: "Calle 5 y Av 6, San José",
      horario: "Lunes a Sábado: 9am - 5pm",
      precio: "Variable",
      descripcion: "Ideal para comprar recuerdos hechos a mano, desde café hasta máscaras y textiles típicos.",
      enlace: "",
      imagen: "resources/Carroza.png"
    },
    {
      nombre: "Servicios Sexuales SJ Centro",
      tipo: "Entretenimiento adulto",
      ubicacion: "Centro histórico, San José",
      horario: "Todos los días: 7pm - 3am",
      precio: "Desde ₡25,000",
      descripcion: "Zona conocida por su vida nocturna y actividades para adultos. Precaución recomendada.",
      enlace: "",
      imagen: "resources/Carroza.png"
    }
  ]
};

// Mostrar lugares
function mostrarLugares(categoria) {
  categoriaSeleccionada = categoria;
  paginaActual = 0;
  ultimaDireccion = "derecha";

  document.getElementById("categorias").style.display = "none";
  document.getElementById("lugares").style.display = "flex";
  document.getElementById("navegacion").classList.add("activa");
  document.getElementById("volver-btn").style.display = "block";

  renderizarLugares();
  renderizarPaginador();
}

// Volver a categorías
function volverACategorias() {
  document.getElementById("categorias").style.display = "flex";
  document.getElementById("lugares").style.display = "none";
  document.getElementById("navegacion").classList.remove("activa");
  document.getElementById("volver-btn").style.display = "none";
}

// Mostrar ficha actual
function renderizarLugares() {
  const contenedor = document.getElementById("lugares");
  contenedor.innerHTML = "";

  const lugar = lugaresData[categoriaSeleccionada][paginaActual];
  const animacion = ultimaDireccion === "izquierda" ? "slideInLeft" : "slideInRight";

  const card = document.createElement("div");
  card.className = "lugar-card";
  card.style.animation = `${animacion} 0.5s ease-out`;

  card.innerHTML = `
    <div class="lugar-imagen" style="background-image: url('${lugar.imagen}')"></div>
    <h3>${lugar.nombre}</h3>
    <p><strong><i class="fa-solid fa-location-dot"></i> Ubicación:</strong> ${lugar.ubicacion}</p>
    <p><strong><i class="fa-regular fa-clock"></i> Horario:</strong> ${lugar.horario}</p>
    <p><strong><i class="fa-solid fa-dollar-sign"></i> Precio:</strong> ${lugar.precio}</p>
    <p>${lugar.descripcion}</p>
    ${lugar.enlace ? `<a href="${lugar.enlace}" target="_blank">Visitar sitio</a>` : ""}
  `;

  contenedor.appendChild(card);
}

// Paginador
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

// Botones
function cambiarPagina(direccion) {
  const total = lugaresData[categoriaSeleccionada]?.length || 0;
  const nueva = paginaActual + direccion;

  if (nueva < 0 || nueva >= total) return;

  ultimaDireccion = direccion > 0 ? "derecha" : "izquierda";
  paginaActual = nueva;
  renderizarLugares();
  renderizarPaginador();
}
