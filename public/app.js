
/*
    Archivo: app.js
    Función: enviar los formularios de registro e inicio de sesión
    a la API del sistema de autenticación.
*/

// Obtenemos los formularios y los espacios para mostrar mensajes
const formRegistro = document.getElementById('formRegistro');
const formLogin = document.getElementById('formLogin');

const mensajeRegistro = document.getElementById('mensajeRegistro');
const mensajeLogin = document.getElementById('mensajeLogin');

// Función reutilizable para enviar los datos a la API
async function enviarSolicitud(url, datos) {
    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    // Convertimos la respuesta del servidor a JSON
    const resultado = await respuesta.json();

    // Generamos un error si el servidor rechaza la solicitud
    if (!respuesta.ok) {
        throw new Error(resultado.mensaje || 'No se pudo completar la solicitud.');
    }

    return resultado;
}

// Procesamos el formulario de registro
formRegistro.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    mensajeRegistro.textContent = 'Registrando usuario...';

    const usuario = document.getElementById('usuarioRegistro').value.trim();
    const contrasena = document.getElementById('contrasenaRegistro').value;

    try {
        const resultado = await enviarSolicitud('/api/auth/registro', {
            usuario,
            contrasena
        });

        mensajeRegistro.textContent =
            resultado.mensaje || 'Usuario registrado correctamente.';

        formRegistro.reset();
    } catch (error) {
        mensajeRegistro.textContent = error.message;
    }
});

// Procesamos el formulario de inicio de sesión
formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    mensajeLogin.textContent = 'Verificando credenciales...';

    const usuario = document.getElementById('usuarioLogin').value.trim();
    const contrasena = document.getElementById('contrasenaLogin').value;

    try {
        const resultado = await enviarSolicitud('/api/auth/login', {
            usuario,
            contrasena
        });

        mensajeLogin.textContent =
            resultado.mensaje || 'Autenticación satisfactoria.';

        formLogin.reset();
    } catch (error) {
        mensajeLogin.textContent = error.message;
    }
});
