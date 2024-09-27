
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.DATABASE_URL;
  const dbName = process.env.MONGO_DB_NAME;

  if (!uri) {
    console.error('La URI de MongoDB no está definida en las variables de entorno');
    process.exit(1);
  }

  if (!dbName) {
    console.error('El nombre de la base de datos no está definido en las variables de entorno');
    process.exit(1);
  }

  const fullUri = `${uri}/${dbName}`;

  console.log('Intentando conectar a MongoDB con la siguiente configuración:');
  console.log(`URI: ${fullUri}`);
  console.log(`Usuario: ${process.env.MONGO_USER}`);
  console.log(`Base de datos: ${dbName}`);

  try {
    await mongoose.connect(fullUri, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    });
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

