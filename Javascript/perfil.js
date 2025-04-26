import supabase from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userId = parseInt(localStorage.getItem('userId'));
    if (!userId) {
        Swal.fire({
            icon: "error",
            title: "Usuario no autenticado.",
            text: "Usuario no autenticado.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        window.location.href = "login.html";
        return;
    }

    const { data: user, error } = await supabase 
        .from('Usuario')
        .select('Name, Email, Cellphone, Password')
        .eq('UserID', userId)
        .single();

    if (error || !user) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al cargar el perfil.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }

    document.getElementById('nombre').value = user.Name;
    document.getElementById('email').value = user.Email;
    document.getElementById('telefono').value = user.Cellphone;
    document.getElementById('password').value = user.Password;

    document.getElementById('togglePassword')?.addEventListener('click', () => {
        const passInput = document.getElementById('password');
        passInput.type = passInput.type === 'password' ? 'text' : 'password';
    });

    // Guardar cambios al enviar el formulario
    document.getElementById('perfilForm')?.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value.trim();

        const { error: updateError } = await supabase
            .from('Usuario')
            .update({
                Name: nombre,
                Email: email,
                Cellphone: telefono,
                Password: password
            })
            .eq('UserID', userId);

        if (updateError) {
            Swal.fire({
                icon: "error",
                title: "Error al guardar cambios.",
                text: "❌ Error al guardar cambios.",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            console.error(updateError);
        } else {
            alert("✅ Perfil actualizado correctamente.");
            window.location.href = 'landingPage.html';
        }
    });

    document.getElementById('btnCancelar')?.addEventListener('click', () => {
        window.location.href = 'landingPage.html';
    });
});
