const dynamoose = require('dynamoose');

const examplesSchema = new dynamoose.Schema(
  {
    id: {
      hashKey: true,
      type: String,
    },
    created: Number,
    example: String,
  },
  {
    throughput: { read: 5, write: 5 },
  },
);

module.exports = {
  examplesSchema,
};
