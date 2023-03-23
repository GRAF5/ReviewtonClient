import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import config from '../config';
import { contentClient } from './content.client';

afterEach(cleanup);

describe('ContentClient', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({})
    }));
  });

  afterAll(() => {
    localStorage.clear();
  });

  test('should fetch get articles', async () => {
    let res = await contentClient.getArticles();
    expect(res).toStrictEqual({});
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([`${process.env.REACT_APP_SERVER_URL}/content/articles?limit=1000&offset=0&filter=`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }]);
  });
});
