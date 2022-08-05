const request = require('supertest');
const app = require('../../app');
const { API_URI, EXAMPLES_URI } = require('../../constants/constants');
const { mockGetAllExamplesResponse, mockGetExampleResponse } = require('../mocks/examples');

const agent = request(app);

describe('Example GET endpoints', () => {
  it('should get all examples', async () => {
    const res = await agent.get([API_URI, EXAMPLES_URI].join(''));

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(mockGetAllExamplesResponse);
  });

  it('should return a 404 if incorrect path used', async () => {
    const res = await agent.get([API_URI, '/notAnExample'].join(''));

    expect(res.statusCode).toBe(404);
    expect(res.error).toBeTruthy();
  });
});

describe('Example POST endpoints', () => {
  it('should save an example', async () => {
    const res = await agent.post([API_URI, EXAMPLES_URI].join('')).send(mockGetExampleResponse);

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({ status: `Example saved!` });
  });

  it('should return a 404 if incorrect path used', async () => {
    const res = await agent.post([API_URI, '/notAnExample'].join('')).send(mockGetExampleResponse);

    expect(res.statusCode).toBe(404);
    expect(res.error).toBeTruthy();
  });
});

describe('Example DELETE endpoints', () => {
  it('should delete an example', async () => {
    const res = await agent.delete([API_URI, EXAMPLES_URI, `/${mockGetExampleResponse.id}`].join(''));

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({ status: `Example with ID:${mockGetExampleResponse.id} deleted` });
  });

  it('should return a 500 if no club found', async () => {
    const res = await agent.delete([API_URI, EXAMPLES_URI, '/notAnId'].join(''));

    expect(res.statusCode).toBe(500);
    expect(res.error).toBeTruthy();
  });

  it('should return a 404 if incorrect path used', async () => {
    const res = await agent.delete([API_URI, '/notAPath', `/${mockGetExampleResponse.id}`].join(''));

    expect(res.statusCode).toBe(404);
    expect(res.error).toBeTruthy();
  });
});
