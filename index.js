const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

//Crear el servidor de express
const app = express();

//CORS
app.use(cors());

// //Directorio Publico
app.use( express.static(path.join(__dirname,'public')) )

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/auth', require('./routes/auth'));
app.use('/movements', require('./routes/movements'));
app.use('/users', require('./routes/users'));

app.get('*', ( req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//Escuchar peticions
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})
