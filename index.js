/* El término middleware se refiere al sistema de software que ofrece funciones y servicios de nube comunes
para las aplicaciones, de modo que los desarrolladores y los equipos de operaciones puedan diseñarlas e
implementarlas con mayor eficiencia. Además, permite conectar las aplicaciones, los datos y los usuarios. */
const path = require('path');

const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar cors
app.use(cors());

// Carpeta publica
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// mean_user
// hT7CKI3Mk1SiP5mh


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

// Lo último
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

