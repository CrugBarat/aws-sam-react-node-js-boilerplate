/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const { LOCAL_REGION, LOCAL_DDB_ENDPOINT, EXAMPLES_TABLE } = require('../constants/constants');

AWS.config.update({
  region: LOCAL_REGION,
  endpoint: LOCAL_DDB_ENDPOINT,
});

const db = new AWS.DynamoDB();

const clubs = {
  TableName: EXAMPLES_TABLE,
};

db.deleteTable(clubs, (err, data) => {
  if (err) {
    console.error('Error:', JSON.stringify(err, null, 2));
  } else {
    console.log(`${EXAMPLES_TABLE} table deleted:`, JSON.stringify(data, null, 2));
  }
});
