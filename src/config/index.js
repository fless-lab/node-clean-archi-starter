require('dotenv').config();

const config = {
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres'
    },
    port: process.env.PORT || 3000,
    saltRounds: 12
};

module.exports = config;
