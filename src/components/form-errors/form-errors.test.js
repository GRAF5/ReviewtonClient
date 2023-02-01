/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FormErrors from './form-errors';

afterEach(cleanup);

describe('FormErrors', () => {

  test('should not render without errors', () => {
    let view = render(<FormErrors />);
    let ul = view.container.querySelector('ul');
    expect(ul).toBe(null);
  });

  test('should render errors', () => {
    let view = render(<FormErrors errors={['error 1', 'error 2']} />);
    let ul = view.container.querySelector('ul');
    let lis = view.container.querySelectorAll('li');
    expect(ul).not.toBe(null);
    expect(lis.length).toBe(2);
    expect(lis[0].textContent).toBe('error 1');
    expect(lis[1].textContent).toBe('error 2');
  });
});