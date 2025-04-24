import supabase from './supabase.js';

let currentRating = 0;

function renderStars() {
    const container = document.getElementById('starContainer');
    container.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.innerHTML = '★';
        star.style.cursor = 'pointer';
        star.style.fontSize = '1.5rem';
        star.style.color = i <= currentRating ? '#ffc107' : '#e4e5e9';
        star.addEventListener('click', () => highlightStars(i));
        container.appendChild(star);
    }
}

function highlightStars(rating) {
    currentRating = rating;
    renderStars();
}

renderStars();

document.addEventListener('DOMContentLoaded', async () => {
    const userId = parseInt(localStorage.getItem('userId'));
    if (!userId) {
        alert('Debes iniciar sesión para ver tus reservas.');
        window.location.href = 'login.html';
        return;
    }

    const { data: historial, error: historialError } = await supabase
        .from('Historial')
        .select('*, Atraccion: idAtraccion (Nombre, imgLink, Descripcion)')
        .eq('idUsuario', userId)
        .order('fecha', { ascending: false });

    const { data: reviews, error: reviewError } = await supabase
        .from('Review')
        .select('idAtraccion')
        .eq('idUsuario', userId);

    const container = document.getElementById('reservasContainer');

    if (historialError || reviewError) {
        alert('Error al cargar las reservas o reviews.');
        console.error(historialError || reviewError);
        return;
    }

    const atraccionesYaReview = new Set(reviews?.map(r => r.idAtraccion));

    if (!historial.length) {
        container.innerHTML = '<p class="text-center text-muted">Aún no tienes reservas.</p>';
        return;
    }

    historial.forEach(reserva => {
        const yaDejoReview = atraccionesYaReview.has(reserva.idAtraccion);

        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';

        card.innerHTML = `
            <div class="card h-100">
                <img src="${reserva.Atraccion.imgLink}" alt="${reserva.Atraccion.Nombre}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${reserva.Atraccion.Nombre}</h5>
                    <p class="card-text">${reserva.Atraccion.Descripcion}</p>
                    <ul class="list-unstyled mb-0">
                        <li><strong>Cantidad reservada:</strong> ${reserva.cantAtendidos}</li>
                        <li><strong>Total pagado:</strong> ₡${reserva.totalPagado}</li>
                        <li><strong>Fecha:</strong> ${new Date(reserva.fecha).toLocaleDateString()}</li>
                    </ul>
                    <button class="btn btn-outline-primary mt-3 btn-review" data-id="${reserva.idAtraccion}" ${yaDejoReview ? 'disabled' : ''}>
                        Dejar review
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Mostrar modal de review
    setTimeout(() => {
        document.querySelectorAll('.btn-review').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const atraccionId = e.target.getAttribute('data-id');
                document.getElementById('reviewAtraccionId').value = atraccionId;
                document.getElementById('reviewComentario').value = '';
                document.getElementById('reviewAnonimo').checked = false;
                highlightStars(0);
                bootstrap.Modal.getOrCreateInstance(document.getElementById('reviewModal')).show();
            });
        });
    }, 300); // Asegura que los botones existan en el DOM
});

// Enviar review
document.getElementById('btnCompletarReview').addEventListener('click', async () => {
    const idUsuario = parseInt(localStorage.getItem('userId'));
    const idAtraccion = parseInt(document.getElementById('reviewAtraccionId').value);
    const comentario = document.getElementById('reviewComentario').value;
    const puntuacion = currentRating;
    const anonimo = document.getElementById('reviewAnonimo').checked;

    if (puntuacion < 1) {
        alert('Selecciona una puntuación antes de enviar tu review.');
        return;
    }

    const { error } = await supabase.from('Review').insert([{
        idUsuario,
        idAtraccion,
        comentario,
        puntuacion,
        anonimo
    }]);

    if (error) {
        alert('❌ Error al enviar review.');
        console.error(error);
    } else {
        alert('✅ ¡Gracias por tu review!');
        bootstrap.Modal.getInstance(document.getElementById('reviewModal')).hide();
        setTimeout(() => location.reload(), 500); // recargar para desactivar botón
    }
});
