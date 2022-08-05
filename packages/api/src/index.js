/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const { SERVER_MESSAGE } = require('./constants/constants');
const server = require('./app');
const dynamoDb = require('./dynamo/models');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`${SERVER_MESSAGE} ${PORT}`));
