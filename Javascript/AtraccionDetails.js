import supabase from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        alert('No se encontró la atracción.');
        return;
    }

    const { data: atraccion, error } = await supabase
        .from('Atraccion')
        .select('*')
        .eq('AtraccionId', id)
        .single();

    if (error || !atraccion) {
        alert('Error cargando la atracción');
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
            alert('Usuario no autenticado. Por favor inicia sesión.');
            return;
        }

        const total = cantidad * atraccion.Precio;

        const { error } = await supabase.from('Historial').insert([{
            idUsuario: userId,
            idAtraccion: atraccion.AtraccionId,
            cantAtendidos: cantidad,
            totalPagado: total,
            fecha: new Date(fechaSeleccionada).toISOString()
        }]);

        if (error) {
            alert('❌ No se pudo registrar la reserva');
        } else {
            alert('✅ Reserva registrada con éxito');
            inputCantidad.value = 1;
            inputFecha.value = '';

            setTimeout(() => {
                window.location.href = 'landingPage.html';
            }, 500);
        }
    });
});

