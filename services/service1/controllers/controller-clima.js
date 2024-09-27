// Propósito: Contiene los controladores para obtener el clima de una ciudad y el pronóstico del clima de una ciudad
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const Consulta = require('../models/consulta')



const clima = async (req, res, next) => {
    const ciudad = req.params.ciudad;
    const apiKey = process.env.API_KEY_OPENWEATHERMAP;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const ciudadNombre = data.name;
        const paisNombre = data.sys.country;
        const temperatura = data.main.temp - 273.15; // Convertir de Kelvin a Celsius
        const humedad = data.main.humidity;
        const descripcion = data.weather[0].description;
        const icono = data.weather[0].icon;
        const viento = data.wind.speed;

        req.climaData = {
            ciudad: ciudadNombre,
            pais: paisNombre,
            temperatura: temperatura.toFixed(2), // Redondear a 2 decimales
            humedad: humedad,
            descripcion: descripcion,
            icono: icono,
            viento: viento
        };

        next();
    } catch (error) {
        res.status(500).send('Error al obtener los datos del clima');
    }
};


async function guardarConsulta(endpoint) {
    const nuevaConsulta = new Consulta({ endpoint });
    try {
        await nuevaConsulta.save();
        console.log('Consulta guardada exitosamente');
    } catch (error) {
        console.error('Error al guardar la consulta:', error);
    }
}

const pronostico = async (req, res) => {
    const ciudad = req.params.ciudad;
    const apiKey = process.env.API_KEY_OPENWEATHERMAP;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const datosClima = response.data;

        const pronostico = {
            ciudad: datosClima.city.name,
            temperatura: parseFloat((datosClima.list[0].main.temp - 273.15).toFixed(2)),

        };

      

        res.json(pronostico);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pronóstico' });
    }
};

module.exports = { clima, pronostico, guardarConsulta};