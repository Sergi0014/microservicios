const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/controllerCripto');

router.get('/precio/:criptomoneda', cryptoController.getPrecio);
router.get('/historico/:criptomoneda', cryptoController.getHistorico);
router.post('/alerta', cryptoController.createAlerta);

module.exports = router;