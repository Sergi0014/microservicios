const express = require('express');
const path = require('path');
const router = require('./routers/routes');
const connectDB = require('./models/database');
require('dotenv').config();; // Cargar variables de entorno desde el archivo .env

const app = express();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/', router);

// Conectar a MongoDB
connectDB().then(() => {
    const PORT = process.env.SERVICIO_DE_CLIMA || 3001;
    app.listen(PORT, () => {
        console.log(`Service 1 listening on port ${PORT}`);
    });
});

module.exports = app; 