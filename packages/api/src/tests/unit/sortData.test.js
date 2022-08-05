const { sortData } = require('../../utils/sortData');

const data = [{ created: 1 }, { created: 4 }, { created: 3 }, { created: 2 }];

describe('createId', () => {
  it('should sort object arr based on time created, newest first', () => {
    const sortedData = sortData(data);
    expect(sortedData[0].created).toBe(4);
    expect(sortedData[1].created).toBe(3);
    expect(sortedData[2].created).toBe(2);
    expect(sortedData[3].created).toBe(1);
  });

  it('should return an empty array if arr is null', () => {
    const sortedData = sortData(null);
    expect(sortedData).toStrictEqual([]);
  });

  it('should return an empty array if arr is undefined', () => {
    const sortedData = sortData(undefined);
    expect(sortedData).toStrictEqual([]);
  });
});
