/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Register from './register';
import * as userService from '../../services/user.service';
import * as router from 'react-router';

describe('Register', () => {
  const { window } = global;
  afterEach(() => {
    global.window = window;
  });

  test('should render login page', async () => {
    let view = render(<MemoryRouter> 
      <Register />
      </MemoryRouter>);
    const divs = view.container.querySelectorAll('div');
    expect(divs[0].className).toBe('bordered-content');
  });

  test('should render adaptive register page', async () => {
    global.window.innerWidth = 575;
    let view = render(<MemoryRouter> 
      <Register />
      </MemoryRouter>);
    const divs = view.container.querySelectorAll('div');
    expect(divs[0].className).toBe('content');
  });
  
  test('should contains four inputs', async () => {
    let view = render(<MemoryRouter> 
      <Register />
      </MemoryRouter>);
    const inputs = view.container.querySelectorAll('input');
    expect(inputs.length).toBe(4);
    expect(inputs[0].id).toBe('email');
    expect(inputs[1].id).toBe('login');
    expect(inputs[2].id).toBe('password');
    expect(inputs[3].id).toBe('passwordRepeat');
  });

  test('should set errors after submit', async () => {
    userService.userService.register = jest.fn(() => new Promise((res, rej) => rej({
      details: {
        errors: [{msg: 'Error'}]
      }})));
    let view = render(<MemoryRouter> 
      <Register />
      </MemoryRouter>);
    const button = view.container.querySelector('button');
    const inputs = view.container.querySelectorAll('input');
    fireEvent.change(inputs[0], {target: {value: 'test@test.com'}});
    fireEvent.change(inputs[1], {target: {value: 'login'}});
    fireEvent.change(inputs[2], {target: {value: 'Qwerty1234'}});
    fireEvent.change(inputs[3], {target: {value: 'Qwerty1234'}});
    fireEvent.click(button);
    expect(userService.userService.register).toBeCalledTimes(1);
    const li = await screen.findByText('Error');
    expect(li).not.toBe(null);
  });

  test('should redirects', async () => {
    userService.userService.register = jest.fn(() => new Promise((res) => res()));
    let mockNavigate = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate)
    let view = render(<MemoryRouter> 
      <Register />
      </MemoryRouter>);
    const button = view.container.querySelector('button');
    const inputs = view.container.querySelectorAll('input');
    fireEvent.change(inputs[0], {target: {value: 'test@test.com'}});
    fireEvent.change(inputs[1], {target: {value: 'login'}});
    fireEvent.change(inputs[2], {target: {value: 'Qwerty1234'}});
    fireEvent.change(inputs[3], {target: {value: 'Qwerty1234'}});
    fireEvent.click(button);
    expect(userService.userService.register).toBeCalledTimes(1);
    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1));
  });
});