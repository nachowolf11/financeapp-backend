const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Crear el servidor de express
const app = express();

//CORS
app.use(cors());

//Directorio Publico


//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/auth', require('./routes/auth'));
app.use('/movements', require('./routes/movements'));
app.use('/users', require('./routes/users'));

//Escuchar peticions
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})
