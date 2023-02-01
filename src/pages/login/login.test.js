/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as userService from '../../services/user.service';
import Login from './login';

describe('Login', () => {
  const { window } = global;
  afterEach(() => {
    global.window = window;
  });

  test('should render login page', async () => {
    let view = render(<MemoryRouter> 
      <Login />
      </MemoryRouter>);
    const divs = view.container.querySelectorAll('div');
    expect(divs[0].className).toBe('bordered-content');
  });

  test('should render adaptive login page', async () => {
    global.window.innerWidth = 575;
    let view = render(<MemoryRouter> 
      <Login />
      </MemoryRouter>);
    const divs = view.container.querySelectorAll('div');
    expect(divs[0].className).toBe('content');
  });

  test('should contains two inputs', async () => {
    let view = render(<MemoryRouter> 
      <Login />
      </MemoryRouter>);
    const inputs = view.container.querySelectorAll('input');
    expect(inputs.length).toBe(2);
    expect(inputs[0].id).toBe('credentials');
    expect(inputs[1].id).toBe('password');
  });

  test('should set errors after submit', async () => {
    userService.userService.authenticate = jest.fn(() => new Promise((res, rej) => rej({message: 'Error'})));
    let view = render(<MemoryRouter> 
      <Login />
      </MemoryRouter>);
    const button = view.container.querySelector('button');
    const inputs = view.container.querySelectorAll('input');
    fireEvent.change(inputs[0], {target: {value: 'test'}});
    fireEvent.change(inputs[1], {target: {value: 'pass'}});
    fireEvent.click(button);
    expect(userService.userService.authenticate).toBeCalledTimes(1);
    const li = await screen.findByText('Error');
    expect(li).not.toBe(null);
  });
});