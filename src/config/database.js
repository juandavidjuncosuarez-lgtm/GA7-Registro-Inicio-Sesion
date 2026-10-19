
const mysql = require('mysql2/promise');

// Creamos la conexión con la base de datos MySQL
const conexion = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '', // Contraseña de MySQL; en XAMPP suele estar vacía por defecto
    database: 'ga7_auth_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Comprobamos que la conexión funciona correctamente
conexion.getConnection()
    .then((connection) => {
        console.log('Conexión a MySQL realizada correctamente');
        connection.release();
    })
    .catch((error) => {
        console.error('Error al conectar con MySQL:', error.message);
    });

// Exportamos la conexión para utilizarla en otras partes del proyecto
module.exports = conexion;
