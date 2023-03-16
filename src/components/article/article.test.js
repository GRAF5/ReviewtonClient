/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { contentClient } from '../../clients/content.client';
import Article from './article';
import 'intersection-observer';
import 'core-js';

describe('Article', () => {
  let article;
  let user;
  const { window } = global;

  beforeEach(() => {
    user = {
      _id: 'userId',
      login: 'user',
      token: 'token'
    };
    article = {
      _id: 'articleId',
      user: {
        _id: 'authorId',
        login: 'author'
      },
      text: 'text',
      views: 1,
      createTime: 1000000,
      commentsCount: 5,
      subject: {
        _id: 'subject',
        name: 'subject'
      },
      tags: [{
        _id: 'tag1',
        name: 'tag1'
      }]
    };
  });
  afterEach(() => {
    global.window = window;
  });

  test('should render article', async () => {
    global.window.innerWidth = (+process.env.REACT_APP_CONTENT_WIDTH) + 1;
    let view = render(
      <MemoryRouter>
        <Article article={article} user={user} />
      </MemoryRouter>
    );
    let contentDiv = view.container.getElementsByClassName('bordered-content');
    expect(contentDiv.length).toBe(1);
    let borderedContentDiv = view.container.getElementsByClassName('content');
    expect(borderedContentDiv.length).toBe(0);
    let login = await screen.findByText(article.user.login);
    expect(login).not.toBe(null);
    let subject = await screen.findByText(article.subject.name);
    expect(subject).not.toBe(null);
    let tag = await screen.findByText(article.tags[0].name);
    expect(tag).not.toBe(null);
  });

  test('should render article adaptive', async () => {
    global.window.innerWidth = (+process.env.REACT_APP_CONTENT_WIDTH) -1;
    let view = render(
      <MemoryRouter>
        <Article article={article} user={user} />
      </MemoryRouter>
    );
    let contentDiv = view.container.getElementsByClassName('bordered-content');
    expect(contentDiv.length).toBe(0);
    let borderedContentDiv = view.container.getElementsByClassName('content');
    expect(borderedContentDiv.length).toBe(1);
  });
});