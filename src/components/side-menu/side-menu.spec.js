/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SideMenu from './side-menu';

const maxWidth = (+process.env.REACT_APP_CONTENT_WIDTH) + 345 * 2;
afterEach(cleanup);
let userStore = {
  user: {id: 'id'}, 
  checkAccessByRole: () => {return true;}
}
describe('SideMenu', () => {

  describe('normal', () => {

    beforeAll(() => {
      global.window.innerWidth = maxWidth;
    });

    afterAll(() => {
      global.window.innerWidth = 1024;
    });
    
    test('should render side menu', () => {
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      const links = view.container.querySelectorAll('a');
      expect(links.length).toBe(7);
    });
    
    test('should render side menu with open item', async () => {
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      fireEvent.click(links[links.length - 1]);
      let nLinks = view.container.querySelectorAll('a');
      expect(nLinks.length).toBe(10);
    });

    test('should close opened on link click', async () => {
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      fireEvent.click(links[links.length - 1]);
      links = view.container.querySelectorAll('a');
      expect(links.length).toBe(10);
      fireEvent.click(links[1]);
      links = view.container.querySelectorAll('a');
      expect(links.length).toBe(7);
    });

    test('should active child', async () => {
      render(
        <MemoryRouter initialEntries={['/moderate/users']}>
          <SideMenu userStore={userStore} />
        </MemoryRouter>);
      let link = screen.getByText('Користувачі')
      expect(link.className).toBe('child active ');
    });

    test('should render adaptive if width < maxWidth', async () => {
      global.window.innerWidth = 1275;
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      expect(links.length).toBe(0);
      let img = view.container.querySelector('img');
      expect(img).not.toBe(null);
    });

    test('should render items in adaptive mode', async () => {
      global.window.innerWidth = 1275;
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      expect(links.length).toBe(0);
      let img = view.container.querySelector('img');
      expect(img).not.toBe(null);
      fireEvent.click(img);
      links = view.container.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(0);
    });
    
    test('should handle exit', async () => {
      global.window.innerWidth = 1275;
      let userStore = {
        user: {id: 'id'},
        exit: jest.fn(), 
        checkAccessByRole: () => {}
      };
      let view = render(
        <MemoryRouter>
          <SideMenu userStore={userStore} />
        </MemoryRouter>
      );
      let img = view.container.querySelector('img');
      fireEvent.click(img);
      const button = view.container.querySelector('button');
      fireEvent.click(button);
      expect(userStore.exit).toBeCalledTimes(1);
    });
    
    test('should not render require auth childs', async () => {
      global.window.innerWidth = maxWidth;
      let userStore = {
        user: null,
        checkAccessByRole: () => {}
      };
      let view = render(
        <MemoryRouter>
          <SideMenu userStore={userStore} />
        </MemoryRouter>
      );
      let links = view.container.querySelectorAll('a');
      expect(links.length).toBe(3);
    });
    
    test('should not render require role childs', async () => {
      global.window.innerWidth = maxWidth;
      let userStore = {
        user: {id: 'id'},
        checkAccessByRole: () => { return false; }
      };
      let view = render(
        <MemoryRouter>
          <SideMenu userStore={userStore} />
        </MemoryRouter>
      );
      let links = view.container.querySelectorAll('a');
      expect(links.length).toBe(5);
    });
  });
});