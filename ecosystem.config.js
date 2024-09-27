module.exports = {
  apps: [
    {
      name: 'service1',
      script: './services/service1/app.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        SERVICIO_DE_CLIMA: process.env.SERVICIO_DE_CLIMA,
        DATABASE_URL: process.env.DATABASE_URL,
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASS: process.env.MONGO_PASS,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME
      },
      env_production: {
        NODE_ENV: 'production',
        SERVICIO_DE_CLIMA: process.env.SERVICIO_DE_CLIMA,
        DATABASE_URL: process.env.DATABASE_URL,
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASS: process.env.MONGO_PASS,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME
      }
    },
    {
      name: 'service2',
      script: './services/service2/app.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        SERVICIO_CRIPTOMONEDA: process.env.SERVICIO_CRIPTOMONEDA
      },
      env_production: {
        NODE_ENV: 'production',
        SERVICIO_CRIPTOMONEDA: process.env.SERVICIO_CRIPTOMONEDA
      }
    },
    {
      name: 'gateway',
      script: './gateway/index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PUERTO_GATEWAY: process.env.PUERTO_GATEWAY,
      },
      env_production: {
        NODE_ENV: 'production',
        PUERTO_GATEWAY: process.env.PUERTO_GATEWAY,
      }
    }
  ]
};
