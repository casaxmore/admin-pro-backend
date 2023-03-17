/* El término middleware se refiere al sistema de software que ofrece funciones y servicios de nube comunes
para las aplicaciones, de modo que los desarrolladores y los equipos de operaciones puedan diseñarlas e
implementarlas con mayor eficiencia. Además, permite conectar las aplicaciones, los datos y los usuarios. */


const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// mean_user
// hT7CKI3Mk1SiP5mh


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

