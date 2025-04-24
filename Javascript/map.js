var map = L.map('map').setView([9.932, -84.079], 13);

// Carga el mapa base desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {attribution: '&copy; OpenStreetMap contributors'}).addTo(map);

// Ícono para museos (azul)
const iconoMuseo = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
  });
  
  // Ícono para restaurantes (rojo)
  const iconoRestaurante = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
  });
  
// pines de museos
var museos = [
  {
    nombre: "Museo de los Niños",
    coords: [9.941244, -84.079662],
    descripcion: "Ofrece una experiencia interactiva. para niños y jóvenes."
  },
  {
    nombre: "Museo del Oro Precolombino",
    coords: [9.933668, -84.076616],
    descripcion: "Exhibe artefactos precolombinos de oro."
  },
  {
    nombre: "Museo del Jade",
    coords: [9.933106, -84.072785],
    descripcion: "la mayor colección de jade precolombino en América."
  },
  {
    nombre: "Bario Chino",
    coords: [9.932206675878609, -84.07495573922746],
    descripcion: "Disfrute de la cultura asiática en el corazón de San José."
  }
];

var restaurantes = [
    {
      nombre: "Cafe Mundo",
      coords: [9.93726243659135, -84.0717064451619],
      descripcion: "Restaurante ubicado en una casa antigua en Barrio Otoya."
    },
    {
      nombre: "Restaurante Nuestra Tierra",
      coords: [9.932267114837781, -84.07147909210975],
      descripcion: "Un restaurante acogedor en el centro de San José."
    },
    {
      nombre: "Silvestre",
      coords: [9.938599507638727, -84.07638196270176],
      descripcion: "Un restaurante de alta cocina costarricense."
    }
  ];
  

// Agrega los marcadores
museos.forEach(function (museo) {
  L.marker(museo.coords).addTo(map)
    .bindPopup(`<strong>${museo.nombre}</strong><br>${museo.descripcion}`);
});
