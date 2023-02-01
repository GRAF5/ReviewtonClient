/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

afterEach(cleanup);

describe('App', () => {

  afterAll(() => {
    global.window.innerWidth = 1024;
  });

  test('should render App', () => {
    global.window.innerWidth = 1276;
    let view = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
    let divs = view.container.querySelectorAll('div');
    let right = false;
    let left = false;
    divs.forEach(el => {
      if (el.className === 'body-left-side') {
        left = true
      } else if (el.className === 'body-right-side') {
        right = true;
      }
    })
    expect(left).toBe(true);
    expect(right).toBe(true);
  });

  test('should render adaptive App', () => {
    global.window.innerWidth = 1275;
    let view = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
    let divs = view.container.querySelectorAll('div');
    let right = false;
    let left = false;
    divs.forEach(el => {
      if (el.className === 'body-left-side') {
        left = true
      } else if (el.className === 'body-right-side-adaptive') {
        right = true;
      }
    })
    expect(left).toBe(true);
    expect(right).toBe(true);
  });

  test('should use windows width - padding for content wrapper', () => {
    global.window.innerWidth = 400;
    let view = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
    let divs = view.container.querySelectorAll('div');
    let bodyWrapper;
    divs.forEach(el => {
      if (el.className === 'content-wrapper') {
        bodyWrapper = el
      }
    })
    expect(bodyWrapper).not.toBe(null);
    expect(bodyWrapper).not.toBe(undefined);
    expect(bodyWrapper.style.width).toBe('360px');
  });
});