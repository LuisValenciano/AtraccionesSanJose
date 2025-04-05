import supabase from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('tourCardsContainer');
  const filtro = document.getElementById('filtro-categoria');

  if (!container) return;

  const { data: tours, error } = await supabase
    .from('Atraccion')
    .select(`
      id,
      Nombre,
      Descripcion,
      Precio,
      imgLink,
      Categorias_Atracciones (
        Categoria (
          Nombre
        )
      )
    `);

  if (error) {
    console.error('Error al obtener los tours:', error.message);
    return;
  }

  let toursGuardados = tours;

  function renderizarTarjetas(lista) {
    container.innerHTML = '';

    lista.forEach((tour) => {
      const categorias = tour.Categorias_Atracciones.map(c => c.Categoria.Nombre.toLowerCase());
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4 lugar';
      card.setAttribute('data-categorias', categorias.join(','));

      const imagen = tour.imgLink
        ? `<div class="card-img-top" style="background-image: url('${tour.imgLink}'); background-size: cover; background-position: center; height: 200px; border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem;"></div>`
        : `<div class="card-img-top placeholder-img"></div>`;

      card.innerHTML = `
        <div class="card tour-card">
          ${imagen}
          <div class="card-body">
            <h5 class="card-title">${tour.Nombre}</h5>
            <p class="card-text">${tour.Descripcion}</p>
            <p class="card-text"><small class="text-muted">Precio desde ₡${tour.Precio}</small></p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  renderizarTarjetas(toursGuardados);

  filtro.addEventListener('change', () => {
    const seleccion = filtro.value.toLowerCase();

    if (seleccion === 'todos') {
      renderizarTarjetas(toursGuardados);
    } else {
      const filtrados = toursGuardados.filter(tour => {
        const categorias = tour.Categorias_Atracciones.map(c => c.Categoria.Nombre.toLowerCase());
        return categorias.includes(seleccion);
      });

      renderizarTarjetas(filtrados);
    }
  });
});
