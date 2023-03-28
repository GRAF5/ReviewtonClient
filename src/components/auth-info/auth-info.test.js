import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthInfo from './auth-info';

describe('AuthInfo', () => {

  test('should render login and register', () => {
    let view = render(
      <BrowserRouter>
        <AuthInfo user={null} />
      </BrowserRouter>
    );
    let links = view.container.querySelectorAll('a');
    expect(links.length).toBe(2);
    let button = view.container.querySelectorAll('button');
    expect(button.length).toBe(0);
  });

  test('should render logout', () => {
    let view = render(
      <BrowserRouter>
        <AuthInfo user={{id: 'id'}} />
      </BrowserRouter>
    );
    let links = view.container.querySelectorAll('a');
    expect(links.length).toBe(0);
    let button = view.container.querySelectorAll('button');
    expect(button.length).toBe(1);
  });
});
