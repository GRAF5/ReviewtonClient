import { cleanup } from '@testing-library/react';
import { userClient } from './user.client';


afterEach(cleanup);


describe('UserClient', () => {
  const fakeRes = {
    token: 'token',
    id: 'id'
  };
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeRes)
    }));
  });

  afterAll(() => {
    localStorage.clear();
  });

  test('should fetch user authenticate', async () => {
    let res = await userClient.authenticate({});
    expect(res).toStrictEqual(fakeRes);
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([
      `${process.env.REACT_APP_SERVER_URL}/user/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({})
      }]);
  });

  test('should fetch user register', async () => {
    let res = await userClient.register({});
    expect(res).toStrictEqual(fakeRes);
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([
      `${process.env.REACT_APP_SERVER_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({})
      }]);
  });

  test('should fetch current', async () => {
    localStorage.setItem('token', 'token');
    let res = await userClient.current();
    expect(res).toStrictEqual(fakeRes);
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([
      `${process.env.REACT_APP_SERVER_URL}/authorization/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer token'
        }
      }]);
  });
});
