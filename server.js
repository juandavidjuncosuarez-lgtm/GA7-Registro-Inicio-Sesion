
const express = require('express');
const path = require('path');

// Importamos la conexión con la base de datos MySQL
const conexion = require('./src/config/database');

// Importamos las rutas de registro e inicio de sesión
const authRoutes = require('./src/routes/authRoutes');

// Creamos la aplicación del servidor web
const app = express();

// Permitimos recibir datos en formato JSON
app.use(express.json());

// Permitimos recibir datos enviados desde formularios
app.use(express.urlencoded({ extended: true }));

// Indicamos la carpeta donde se encuentra la página web
app.use(express.static(path.join(__dirname, 'public')));

// Conectamos las rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta principal: muestra la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para comprobar que la API funciona
app.get('/api', (req, res) => {
    res.status(200).json({
        mensaje: 'API de autenticación funcionando correctamente'
    });
});

// Definimos el puerto del servidor
const PORT = 3000;

// Iniciamos el servidor web
app.listen(PORT, async () => {
    const url = `http://localhost:${PORT}`;

    console.log(`Servidor ejecutándose en ${url}`);

    // Abrimos el navegador automáticamente usando import dinámico
    try {
        const { default: open } = await import('open');
        await open(url);
        console.log('Navegador abierto correctamente.');
    } catch (error) {
        console.error(
            'No se pudo abrir el navegador automáticamente:',
            error.message
        );
        console.log(`Abre manualmente esta dirección: ${url}`);
    }
});
