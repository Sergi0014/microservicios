const express = require('express');
const router = express.Router();
const { clima, pronostico } = require('../controllers/controller-clima'); // Asegúrate de que la ruta sea correcta
const Consulta = require('../models/consulta'); // Importa el modelo Consulta
const connectDB = require('../models/database'); 

connectDB()
router.get('/clima/:ciudad', clima, async (req, res) => {
    try {
        const { ciudad } = req.params;
        const { pais, temperatura, humedad, descripcion, icono, viento } = req.climaData; // Asegúrate de que estos datos se obtengan correctamente en la función clima

        const nuevaConsulta = new Consulta({
            tipo: 'clima',
            ciudad: ciudad,
            pais: pais,
            temperatura: temperatura,
            humedad: humedad,
            descripcion: descripcion,
            icono: icono,
            viento: viento
        });

        await nuevaConsulta.save();
        const response = {
            ciudad: ciudad,
            pais: pais,
            temperatura: temperatura,
            humedad: humedad,
            descripcion: descripcion,
            icono: icono,
            viento: viento,
            mensaje: 'Consulta guardada'
        };
        res.json(response);
    } catch (error) {
        res.status(500).send('Error al guardar la consulta');
    }
});


router.get('/pronostico/:ciudad', pronostico,)

router.get('/consultas', async (req, res) => {
    try {
        const consultas = await Consulta.find();
        res.json(consultas);
    } catch (error) {
        res.status(500).send('Error al obtener las consultas');
    }
});

module.exports = router;



