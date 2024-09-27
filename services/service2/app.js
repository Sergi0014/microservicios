const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers/routes');
const path = require('path'); 
const app = express();
require('dotenv').config();; // Cargar variables de entorno desde el archivo .env

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;

const port = process.env.SERVICIO_CRIPTOMONEDA || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});