import supabase from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "No se encontró la atracción.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }

    const { data: atraccion, error } = await supabase
        .from('Atraccion')
        .select('*')
        .eq('AtraccionId', id)
        .single();

    if (error || !atraccion) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error cargando la atracción",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }

    document.getElementById('nombreAtraccion').textContent = atraccion.Nombre;
    document.getElementById('imagenAtraccion').src = atraccion.imgLink;
    document.getElementById('descripcionAtraccion').textContent = atraccion.Descripcion;
    document.getElementById('precioAtraccion').textContent = atraccion.Precio;
    document.getElementById('capacidadAtraccion').textContent = atraccion.Capacidad;

    const inputCantidad = document.getElementById('cantidadReservar');
    inputCantidad.max = atraccion.Capacidad;

    const inputFecha = document.getElementById('fechaReserva');
    const today = new Date().toISOString().split('T')[0];
    inputFecha.min = today;

    const btn = document.getElementById('btnReservar');
    btn.addEventListener('click', async () => {
        const cantidad = parseInt(inputCantidad.value);
        const max = parseInt(inputCantidad.max);
        const fechaSeleccionada = inputFecha.value;

        const errorCantidad = document.getElementById('errorCantidad');
        const errorFecha = document.getElementById('errorFecha');
        errorCantidad.classList.add('d-none');
        errorFecha.classList.add('d-none');

        if (isNaN(cantidad) || cantidad < 1 || cantidad > max) {
            errorCantidad.classList.remove('d-none');
            return;
        }

        if (!fechaSeleccionada || new Date(fechaSeleccionada) < new Date(today)) {
            errorFecha.classList.remove('d-none');
            return;
        }

        const userId = parseInt(localStorage.getItem('userId'));
        if (!userId) {
            Swal.fire({
                icon: "error",
                title: "Usuario no autenticado.",
                text: "Por favor inicia sesión.",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            return;
        }

        const total = cantidad * atraccion.Precio;

        const { error } = await supabase.from('Historial').insert([{
            idUsuario: userId,
            idAtraccion: atraccion.AtraccionId,
            cantAtendidos: cantidad,
            totalPagado: total,
            fecha: new Date(`${fechaSeleccionada}T12:00:00`).toISOString()
        }]);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "❌ No se pudo registrar la reserva",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        } else {
            Swal.fire({
                title: "Vamooos!",
                text: "✅ Reserva registrada con éxito",
                icon: "success"
            });
            inputCantidad.value = 1;
            inputFecha.value = '';

            setTimeout(() => {
                window.location.href = 'landingPage.html';
            }, 2000);
        }
    });

    // === REVIEWS ===

    const { data: reviews, error: errorReviews } = await supabase
        .from('Review')
        .select('comentario, puntuacion, anonimo, Usuario(Name)')
        .eq('idAtraccion', id);

    let allReviews = reviews || [];

    // Mostrar promedio de estrellas
    if (allReviews.length > 0) {
        const suma = allReviews.reduce((acc, r) => acc + r.puntuacion, 0);
        const promedio = suma / allReviews.length;
        const estrellas = Math.round(promedio);

        const estrellaHtml = Array(5).fill('★').map((star, i) => `
            <span style="font-size: 2rem; color: ${i < estrellas ? '#ffc107' : '#e4e5e9'}">${star}</span>
        `).join('');
        document.getElementById('promedioEstrellas').innerHTML = estrellaHtml;
    } else {
        document.getElementById('promedioEstrellas').textContent = 'Sin calificaciones todavía';
    }

    // Función para renderizar reviews
    const renderReviews = (lista) => {
        const container = document.getElementById('reviewsContainer');
        container.innerHTML = '';

        if (!lista || lista.length === 0) {
            container.innerHTML = '<p class="text-muted">No hay reseñas aún.</p>';
            return;
        }

        lista.forEach(review => {
            const item = document.createElement('div');
            item.className = 'list-group-item';

            const estrellas = '★'.repeat(review.puntuacion) + '☆'.repeat(5 - review.puntuacion);
            const nombre = review.anonimo || !review.Usuario ? 'Usuario anónimo' : review.Usuario.Name;

            item.innerHTML = `
                <strong>${nombre}</strong><br>
                <span class="text-warning">${estrellas}</span>
                <p class="mb-0">${review.comentario}</p>
            `;

            container.appendChild(item);
        });
    };

    // Filtrar reviews por estrellas
    document.getElementById('filtroEstrellas').addEventListener('change', (e) => {
        const valor = e.target.value;
        const filtradas = valor === 'all' ? allReviews : allReviews.filter(r => r.puntuacion === parseInt(valor));
        renderReviews(filtradas);
    });

    renderReviews(allReviews);
});
