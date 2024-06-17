const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../../api/routes/user.routes');
const sequelize = require('../database/sequelize');


const app = express();

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});

module.exports = app;
