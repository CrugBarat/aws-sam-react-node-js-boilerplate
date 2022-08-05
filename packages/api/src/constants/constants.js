require('dotenv').config({ path: '../../.env' });

exports.SERVER_MESSAGE = 'Server is live at';
exports.SERVER_RUNNING = 'API Server is running';

exports.DEV = 'development';
exports.LOCAL_REGION = 'local';
exports.LOCAL_DDB_ENDPOINT = 'http://localhost:8000';

exports.API_URI = '/api';

exports.EXAMPLES_URI = '/examples';
exports.DELETE_EXAMPLE_URI = '/examples/:id';

exports.EXAMPLES_TABLE = `sam-react-node-boilerplate-example-table-${process.env.ENVIRONMENT}`;
