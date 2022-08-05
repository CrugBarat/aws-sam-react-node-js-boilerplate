const { createId } = require('../../utils/createId');

describe('createId', () => {
  it('should create a string with 15 characters', () => {
    expect(createId().length).toBe(15);
  });

  it('should be alphanumeric', () => {
    expect(createId()).toMatch(/^[a-zA-Z0-9]*$/);
  });

  it('should be unique', () => {
    expect(createId()).not.toBe(createId());
  });
});
