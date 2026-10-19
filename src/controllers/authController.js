
const bcrypt = require('bcrypt');
const conexion = require('../config/database');

// Función para registrar un usuario nuevo
async function registrarUsuario(req, res) {
    try {
        // Obtenemos el usuario y la contraseña enviados
        const { usuario, contrasena } = req.body;

        // Validamos que los campos estén completos
        if (!usuario || !contrasena) {
            return res.status(400).json({
                mensaje: 'Debes ingresar un usuario y una contraseña'
            });
        }

        // Comprobamos si el usuario ya existe
        const [usuarios] = await conexion.execute(
            'SELECT id FROM usuarios WHERE usuario = ?',
            [usuario]
        );

        if (usuarios.length > 0) {
            return res.status(409).json({
                mensaje: 'El usuario ya está registrado'
            });
        }

        // Convertimos la contraseña en un hash seguro
        const hash = await bcrypt.hash(contrasena, 10);

        // Guardamos el usuario y el hash en la base de datos
        await conexion.execute(
            'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)',
            [usuario, hash]
        );

        // Respondemos cuando el registro termina correctamente
        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        // Informamos si ocurrió un problema durante el registro
        console.error('Error al registrar usuario:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno al registrar el usuario'
        });
    }
}

// Función para iniciar sesión
async function iniciarSesion(req, res) {
    try {
        // Obtenemos las credenciales enviadas
        const { usuario, contrasena } = req.body;

        // Validamos que se hayan enviado los campos
        if (!usuario || !contrasena) {
            return res.status(400).json({
                mensaje: 'Debes ingresar un usuario y una contraseña'
            });
        }

        // Buscamos el usuario en la base de datos
        const [usuarios] = await conexion.execute(
            'SELECT id, usuario, contrasena FROM usuarios WHERE usuario = ?',
            [usuario]
        );

        // Si no existe, rechazamos la autenticación
        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        // Comparamos la contraseña con el hash guardado
        const coincide = await bcrypt.compare(
            contrasena,
            usuarios[0].contrasena
        );

        // Si la contraseña no coincide, rechazamos el acceso
        if (!coincide) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        // Respondemos cuando las credenciales son correctas
        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria',
            usuario: usuarios[0].usuario
        });

    } catch (error) {
        // Informamos si ocurrió un problema durante el inicio de sesión
        console.error('Error al iniciar sesión:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno durante la autenticación'
        });
    }
}

// Exportamos las funciones para utilizarlas en las rutas
module.exports = {
    registrarUsuario,
    iniciarSesion
};
