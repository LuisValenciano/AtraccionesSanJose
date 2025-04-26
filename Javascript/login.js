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
                    icon: "error",
                    title: "Inténtalo de nuevo",
                    text: "Correo o contraseña incorrectos.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            } else {
                console.log('Inicio de sesión exitoso:', data);
                Swal.fire(`Bienvenido, ${data.Name}`);

                // Guardar datos del usuario en localStorage
                localStorage.setItem('userId', data.UserID);
                localStorage.setItem('userName', data.Name);
                // redirige a landingPage.html a los 2 segundos
                setTimeout(() => {
                    window.location.href = 'landingPage.html';
                }, 1000);
            }
        });
    }
});
