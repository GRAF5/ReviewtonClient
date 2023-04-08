import { render, cleanup, waitFor } from '@testing-library/react';
import App from './App';
import * as userClient from './clients/user.client';
import 'core-js';
import React from 'react';

afterEach(cleanup);
const userStore = {user: {}, setUser: () => {}, checkAccessByRole: () => {}};
describe('App', () => {

  beforeEach(() => {
    global.window.scroll = () => {};
  });
  afterAll(() => {
    global.window.innerWidth = 1024;
  });

  // test('should render App', () => {
  //   global.window.innerWidth = 1276;
  //   let view = render(
  //     <App userStore={userStore} />);
  //   let divs = view.container.querySelectorAll('div');
  //   let right = false;
  //   let left = false;
  //   divs.forEach(el => {
  //     if (el.className === 'body-left-side') {
  //       left = true;
  //     } else if (el.className === 'body-right-side') {
  //       right = true;
  //     }
  //   });
  //   expect(left).toBe(true);
  //   expect(right).toBe(true);
  // });

  // test('should render adaptive App', () => {
  //   global.window.innerWidth = 1275;
  //   let view = render(
  //     <App userStore={userStore} />);
  //   let divs = view.container.querySelectorAll('div');
  //   let right = false;
  //   let left = false;
  //   divs.forEach(el => {
  //     if (el.className === 'body-left-side') {
  //       left = true;
  //     } else if (el.className === 'body-right-side-adaptive') {
  //       right = true;
  //     }
  //   });
  //   expect(left).toBe(true);
  //   expect(right).toBe(true);
  // });

  test('should use windows width - padding for content wrapper', () => {
    global.window.innerWidth = 400;
    let view = render(
      <App userStore={userStore} />);
    let divs = view.container.querySelectorAll('div');
    let bodyWrapper;
    divs.forEach(el => {
      if (el.className === 'content-wrapper') {
        bodyWrapper = el;
      }
    });
    expect(bodyWrapper).not.toBe(null);
    expect(bodyWrapper).not.toBe(undefined);
    expect(bodyWrapper.style.width).toBe('360px');
  });

  test('should call current', async () => {
    userClient.userClient.current = jest.fn(() => new Promise((res) => res({})));
    let view = render(
      <App userStore={userStore} testId='id' />);
    await waitFor(() => expect(userClient.userClient.current).toHaveBeenCalledTimes(1));
  });
});
