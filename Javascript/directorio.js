const lugaresData = {
    museos: [
      {
        nombre: 'Museo de los Niños',
        descripcion: 'Ubicado en un edificio histórico, este museo ofrece una experiencia interactiva para niños y jóvenes, con exhibiciones educativas sobre ciencia, arte y cultura costarricense. Ideal para familias que buscan aprender mientras se divierten.',
        horario: 'Lunes a Sábado: 9am - 5pm',
        enlace: 'https://museocr.org/'
      },
      {
        nombre: 'Museo del Jade',
        descripcion: 'Este museo alberga la mayor colección de jade precolombino en América. Ofrece una mirada fascinante al arte, las creencias y el simbolismo de las culturas indígenas costarricenses.',
        horario: 'Lunes a Domingo: 8am - 5pm',
        enlace: 'https://museodeljade.grupoins.com'
      },
      {
        nombre: 'Museo del Oro',
        descripcion: 'Este museo subterráneo expone una impresionante colección de piezas de oro precolombino, junto a artefactos de jade y cerámica. Es una ventana al legado de las civilizaciones indígenas que habitaron el territorio costarricense.',
        horario: 'Lunes a Sábado: 9am - 4pm',
        enlace: 'https://museosdelbancocentral.org/'
      }
    ],
    restaurantes: [
      {
        nombre: 'Café Mundo',
        descripcion: 'Ubicado en una casa antigua en Barrio Otoya, Café Mundo es conocido por su ambiente bohemio, su variado menú internacional y su deliciosa pizza artesanal.',
        horario: 'Lunes a Sábado: 11am - 10pm',
        enlace: 'https://www.facebook.com/CafeMundoCR/'
      },
      {
        nombre: 'Restaurante Nuestra Tierra',
        descripcion: 'Un lugar acogedor en el centro de San José que ofrece platillos costarricenses tradicionales como olla de carne, arroz con pollo y casados, todo en un entorno rústico y auténtico.',
        horario: 'Todos los días: 7am - 9pm',
        enlace: 'https://www.facebook.com/nuestratierracr/'
      },
      {
        nombre: 'Silvestre',
        descripcion: 'Un restaurante de alta cocina costarricense con un toque contemporáneo, ubicado en un edificio histórico. El chef Santiago Fernández mezcla tradición y modernidad en cada plato.',
        horario: 'Martes a Sábado: 6pm - 10:30pm',
        enlace: 'https://www.restaurantesilvestre.com/'
      }
    ]
  };
  
  function mostrarLugares(categoria) {
    const contenedor = document.getElementById("lugares");
    contenedor.innerHTML = "";
  
    lugaresData[categoria].forEach((lugar, i) => {
      const card = document.createElement("div");
      card.className = "lugar-card";
      card.style.animationDelay = `${i * 0.1}s`;
      card.innerHTML = `
        <h3>${lugar.nombre}</h3>
        <p>${lugar.descripcion}</p>
        <p><strong>Horario:</strong> ${lugar.horario}</p>
        <a href="${lugar.enlace}" target="_blank">Visitar sitio</a>
      `;
      contenedor.appendChild(card);
    });
  }
  