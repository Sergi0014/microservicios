const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    tipo: String,
    ciudad: String,
    pais: String,
    temperatura: String,
    humedad: Number,
    descripcion: String,

    viento: Number
});


const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta; 