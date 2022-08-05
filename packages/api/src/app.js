require('dotenv').config();
const express = require('express');

const app = express();
const { SERVER_RUNNING, API_URI } = require('./constants/constants');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(API_URI, require('./routes/routes'));

app.get('/', (req, res) => {
  res.send({ info: SERVER_RUNNING });
});

module.exports = app;
