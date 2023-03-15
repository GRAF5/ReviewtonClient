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
    expect(global.fetch.mock.lastCall).toEqual([`${process.env.REACT_APP_SERVER_URL}/content/articles?limit=1000&offset=0`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }]);
  });

  test('should fetch get answers', async () => {
    let res = await contentClient.getAnswers('articleId', 'commentId');
    expect(res).toStrictEqual({});
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([
      `${process.env.REACT_APP_SERVER_URL}/content/articles/articleId/comments/commentId/answers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }]);
  });

  test('should fetch get comments', async () => {
    let res = await contentClient.getComments('articleId');
    expect(res).toStrictEqual({});
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([
      `${process.env.REACT_APP_SERVER_URL}/content/articles/articleId/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }]);
  });

  test('should fetch create comment', async () => {
    let res = await contentClient.createComment('text', 'articleId', 'token');
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([
      `${process.env.REACT_APP_SERVER_URL}/content/articles/articleId/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer token`
      },
      body: JSON.stringify({text: 'text'})
    }]);
  });

  test('should fetch create answer', async () => {
    let res = await contentClient.createAnswer('text', 'articleId', 'commentId', 'token');
    expect(global.fetch.mock.calls.length).toBe(1);
    expect(global.fetch.mock.lastCall).toEqual([
      `${process.env.REACT_APP_SERVER_URL}/content/articles/articleId/comments/commentId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer token`
      },
      body: JSON.stringify({text: 'text'})
    }]);
  });
});
