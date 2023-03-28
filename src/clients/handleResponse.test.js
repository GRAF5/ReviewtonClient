import handleResponse from './handleResponse';

describe('handleResponse', () => {

  test('should return data', async () => {
    let data = {
      ok: true,
      json: () => 'Data'
    };
    let res = await handleResponse(data);
    expect(res).toBe('Data');
  });

  test('should throw error', async () => {
    let data = {
      ok: false,
      json: () => 'Data error'
    };
    try {
      let res = await handleResponse(data);
      throw 'Error expected';
    } catch (err) {
      expect(err).toBe('Data error');
    }
  });
});
