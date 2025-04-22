import supabase from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // evita que se recargue la página al enviar el formulario

            // recoge los valores 
            const name = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const cellphone = document.getElementById('telefono').value;

            // inserta
            const { data, error } = await supabase
                .from('Usuario')
                .insert([
                    {
                        Name: name,
                        Email: email,
                        Password: password,
                        Cellphone: cellphone,
                        TypeUser: 'client', // por defecto
                        RegisterDate: new Date().toISOString() // genera un timestamp
                    }
                ]);

            if (error) {
                console.error('Error al registrar el usuario:', error);
                alert('Hubo un error al registrar el usuario. Inténtalo de nuevo.');
            } else {
                console.log('Registro exitoso:', data);
                Swal.fire({
                    title: 'Registro Exitoso',
                    text: 'Se ha creado el usuario correctamente, redirigiendo a la página de inicio...',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                setTimeout(() => {
                    window.location.href = 'index.html';  // a los 2 segundos va devuelta a la pagina principal
                }, 2000);
            }
        });
    }
});
