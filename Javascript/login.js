import supabase from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // evita la recarga de la página

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const { data, error } = await supabase
                .from('Usuario')
                .select('*')
                .eq('Email', email)
                .eq('Password', password)
                .single();

            if (error || !data) {
                console.error('Error en el inicio de sesión:', error);

                Swal.fire({
                    title: 'Error',
                    text: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                console.log('Inicio de sesión exitoso:', data);
                alert(`Bienvenido, ${data.Name}`);

                // Guardar datos del usuario en localStorage
                localStorage.setItem('userId', data.UserID);
                localStorage.setItem('userName', data.Name);
              
                Swal.fire({
                    title: 'Bienvenido',
                    text: 'Se ha ingresado sesion correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                // redirige a landingPage.html a los 2 segundos
                setTimeout(() => {
                    window.location.href = 'landingPage.html';
                }, 1000);
            }
        });
    }
});

