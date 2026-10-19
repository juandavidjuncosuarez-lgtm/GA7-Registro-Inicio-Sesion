
/*
    Archivo: app.js
    Función: gestionar el registro y el inicio de sesión,
    mostrando mensajes de éxito y error.
*/

// Obtenemos los formularios y los espacios de mensajes.
const formRegistro = document.getElementById('formRegistro');
const formLogin = document.getElementById('formLogin');

const mensajeRegistro = document.getElementById('mensajeRegistro');
const mensajeLogin = document.getElementById('mensajeLogin');

// Muestra un mensaje con el estilo correspondiente.
function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `mensaje ${tipo}`;
}

// Envía los datos al servidor y procesa la respuesta.
async function enviarSolicitud(url, datos) {
    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    // Procesamos la respuesta del servidor.
    const resultado = await respuesta.json();

    // Si hay un error, lo comunicamos.
    if (!respuesta.ok) {
        throw new Error(
            resultado.mensaje || 'No se pudo completar la solicitud.'
        );
    }

    return resultado;
}

// Registro de usuarios.
formRegistro.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    mostrarMensaje(
        mensajeRegistro,
        'Registrando usuario...',
        'informacion'
    );

    const boton = formRegistro.querySelector('button[type="submit"]');
    boton.disabled = true;

    const usuario = document.getElementById('usuarioRegistro').value.trim();
    const contrasena = document.getElementById('contrasenaRegistro').value;

    try {
        await enviarSolicitud('/api/auth/registro', {
            usuario,
            contrasena
        });

        mostrarMensaje(
            mensajeRegistro,
            '✓ Usuario guardado correctamente.',
            'exito'
        );

        formRegistro.reset();
    } catch (error) {
        mostrarMensaje(
            mensajeRegistro,
            `✕ No se pudo guardar el usuario: ${error.message}`,
            'error'
        );
    } finally {
        boton.disabled = false;
    }
});

// Inicio de sesión.
formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    mostrarMensaje(
        mensajeLogin,
        'Verificando credenciales...',
        'informacion'
    );

    const boton = formLogin.querySelector('button[type="submit"]');
    boton.disabled = true;

    const usuario = document.getElementById('usuarioLogin').value.trim();
    const contrasena = document.getElementById('contrasenaLogin').value;

    try {
        await enviarSolicitud('/api/auth/login', {
            usuario,
            contrasena
        });

        mostrarMensaje(
            mensajeLogin,
            '✓ Usuario correcto. Autenticación satisfactoria.',
            'exito'
        );

        formLogin.reset();
    } catch (error) {
        mostrarMensaje(
            mensajeLogin,
            '✕ Error en la autenticación. Rectifica el usuario o la contraseña.',
            'error'
        );
    } finally {
        boton.disabled = false;
    }
});
