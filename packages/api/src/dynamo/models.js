const dynamoose = require('dynamoose');
const { examplesSchema } = require('./schemas');
const { DEV, EXAMPLES_TABLE } = require('../constants/constants');

const { sdk } = dynamoose.aws;

sdk.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.DDB_ENDPOINT,
});

// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === DEV ? dynamoose.aws.ddb.local() : dynamoose.aws.ddb();

const Examples = dynamoose.model(EXAMPLES_TABLE, examplesSchema);

module.exports = {
  Examples,
};
