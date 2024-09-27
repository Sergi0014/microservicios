const axios = require('axios');

const getPrecio = async (req, res) => {
  const { criptomoneda } = req.params;
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${criptomoneda}&vs_currencies=usd`);
    const precio = response.data[criptomoneda].usd.toFixed(2); // Formatear el precio a dos decimales
    res.json({ criptomoneda, precio });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el precio' });
  }
};

const getHistorico = async (req, res) => {
  const { criptomoneda } = req.params;
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${criptomoneda}/market_chart?vs_currency=usd&days=30`);
    const precios = response.data.prices.map(([timestamp, price]) => ({
      fecha: new Date(timestamp).toISOString().split('T')[0], // Formatear la fecha a YYYY-MM-DD
      precio: price.toFixed(2) // Formatear el precio a dos decimales
    }));
    const ultimos5Dias = precios.slice(-5); // Obtener los últimos 5 días
    res.json(ultimos5Dias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial' }); 
  }
};

const createAlerta = (req, res) => {
  const { criptomoneda, precio } = req.body;
  // Aquí se implementaría la lógica para crear una alerta
  res.json({ message: `Alerta creada para ${criptomoneda} a un precio de ${precio}` });
};

module.exports = {
  getPrecio,
  getHistorico,
  createAlerta
};