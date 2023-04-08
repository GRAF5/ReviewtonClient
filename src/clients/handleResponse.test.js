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
      status: 404,
      json: () => {return {msg: 'Data error'};}
    };
    try {
      let res = await handleResponse(data);
      throw 'Error expected';
    } catch (err) {
      expect(err).toStrictEqual({
        msg: 'Data error',
        status: 404
      });
    }
  });
});
