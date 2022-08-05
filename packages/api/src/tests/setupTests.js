const { mockGetAllExamplesResponse, mockGetExampleResponse } = require('./mocks/examples');

jest.mock('../dynamo/models.js', () => ({
  Examples: {
    scan: jest.fn(() => ({
      exec() {
        return new Promise((resolve) => {
          resolve(mockGetAllExamplesResponse);
        });
      },
    })),
    delete: ({ id }) => {
      return new Promise((resolve, reject) => {
        if (id === mockGetExampleResponse.id) {
          resolve({ status: `Example with ID:${id} deleted` });
        }
        reject(new Error('Example not found'));
      });
    },
    create: () => {
      return new Promise((resolve) => {
        resolve({ status: 'Example saved!' });
      });
    },
  },
}));
