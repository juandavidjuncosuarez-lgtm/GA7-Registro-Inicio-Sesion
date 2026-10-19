
const express = require('express');

// Importamos las funciones del controlador de autenticación
const {
    registrarUsuario,
    iniciarSesion
} = require('../controllers/authController');

// Creamos el enrutador de autenticación
const router = express.Router();

// Ruta para registrar un usuario nuevo
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Exportamos las rutas para utilizarlas en server.js
module.exports = router;
