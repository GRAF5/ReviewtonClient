import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';

afterEach(cleanup);

describe('Header', () => {
  const { window } = global;
  afterEach(() => {
    global.window = window;
  });

  test('should handle exit', async () => {
    let userStore = {
      user: {id: 'id'},
      exit: jest.fn()
    };
    global.window.innerWidth = 345 * 2 + (+process.env.REACT_APP_CONTENT_WIDTH);
    let view = render(
      <MemoryRouter>
        <Header userStore={userStore} />
      </MemoryRouter>
    );
    const button = view.container.querySelector('button');
    fireEvent.click(button);
    expect(userStore.exit).toBeCalledTimes(0);
  });
});
