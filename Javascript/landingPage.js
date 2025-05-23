import supabase from './supabase.js';

let reservaInfoActual = null;


const categoryContainer = document.getElementById('categoryButtons');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Cargado');
    console.log(document.getElementById('tourCardsContainer'));
    await cargarTodasLasAtracciones();
    await cargarCategorias();
});

async function cargarCategorias() {
    if (!categoryContainer) return;

    // Todos
    const allBtn = document.createElement('button');
    allBtn.className = 'btn btn-outline-primary mr-2';
    allBtn.textContent = 'Todos';
    allBtn.addEventListener('click', () => {
        cargarTodasLasAtracciones();
    });
    categoryContainer.appendChild(allBtn);

    // cargar categorías desde Supabase
    const { data: categorias, error: catError } = await supabase
        .from('Categorias')
        .select('CategoriaID, Nombre');


    if (catError) {
        console.error('Error al obtener categorías:', catError.message);
        return;
    }

    categorias.forEach((categoria) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary mr-2';
        btn.textContent = categoria.Nombre;
        btn.dataset.id = categoria.CategoriaID;

        btn.addEventListener('click', () => {
            cargarAtraccionesPorCategoria(categoria.CategoriaID);
        });


        categoryContainer.appendChild(btn);
    });
}

async function cargarAtraccionesPorCategoria(categoriaId) {
    const container = document.getElementById('tourCardsContainer');
    container.innerHTML = '';

    const { data: relaciones, error: relError } = await supabase
        .from('Categorias_Atracciones')
        .select('AtraccionId')
        .eq('CategoriaID', categoriaId);

    if (relError) {
        console.error('Error al obtener relaciones:', relError.message);
        return;
    }

    const atraccionIds = relaciones.map((rel) => rel.AtraccionId);

    if (atraccionIds.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay atracciones para esta categoría.</p>';
        return;
    }

    const { data: atracciones, error: atracError } = await supabase
        .from('Atraccion')
        .select('AtraccionId, Nombre, Descripcion, Precio, imgLink, Capacidad')
        .in('AtraccionId', atraccionIds);

    if (atracError) {
        console.error('Error al cargar atracciones:', atracError.message);
        return;
    }

    renderizarAtracciones(atracciones);
}

async function cargarTodasLasAtracciones() {
    const container = document.getElementById('tourCardsContainer');
    container.innerHTML = '';

    const { data: atracciones, error } = await supabase
        .from('Atraccion')
        .select('AtraccionId, Nombre, Descripcion, Precio, imgLink, Capacidad');

    if (error) {
        console.error('Error al cargar todas las atracciones:', error.message);
        return;
    }

    renderizarAtracciones(atracciones);
}

function renderizarAtracciones(lista) {
    const container = document.getElementById('tourCardsContainer');
    container.innerHTML = '';

    lista.forEach((tour) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

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

        card.addEventListener('click', () => {
            window.location.href = `AtraccionDetails.html?id=${tour.AtraccionId}`;
        });

        container.appendChild(card);
    });
}

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
        await cargarTodasLasAtracciones();
        return;
    }

    const { data: atracciones, error } = await supabase
        .from('Atraccion')
        .select('AtraccionId, Nombre, Descripcion, Precio, imgLink, Capacidad');

    if (error) {
        console.error('Error al buscar atracciones:', error.message);
        return;
    }

    const resultados = atracciones.filter((atraccion) =>
        atraccion.Nombre.toLowerCase().includes(query)
    );

    renderizarAtracciones(resultados);
});

// Permitir búsqueda con Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
});










