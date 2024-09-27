const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();

// Configuración de los microservicios
const service1 = 'http://localhost:3001';
const service2 = 'http://localhost:3002';


// Rutas del gateway
app.get('/clima/:ciudad', async (req, res) => {
    try {
        const response = await axios.get(`${service1}/clima/${req.params.ciudad}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos del microservicio' });
    }
});

app.get('/pronostico/:ciudad', async (req, res) => {
    try {
        const response = await axios.get(`${service1}/pronostico/${req.params.ciudad}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos del microservicio' });
    }
});

// Rutas del gateway para service2
app.get('/precio/:criptomoneda', async (req, res) => {
    try {
        const response = await axios.get(`${service2}/precio/${req.params.criptomoneda}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos del microservicio' });
    }
});
 
app.get('/historico/:criptomoneda', async (req, res) => {
    try {
        const response = await axios.get(`${service2}/historico/${req.params.criptomoneda}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos del microservicio' });
    }
});

app.post('/alerta', async (req, res) => {
    try {
        const response = await axios.post(`${service2}/alerta`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la alerta en el microservicio' });
    }
});

// Servir el archivo index.html
app.use(express.static(path.join(__dirname, '../public')));

// Puerto del gateway
const PORT = process.env.PUERTO_GATEWAY || 3000;
app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}`);
});