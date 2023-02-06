/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SideMenu from './side-menu';

afterEach(cleanup);
let userStore = {
  user: {id: 'id'}, 
  checkAccessByRole: () => {return true;}
}
describe('SideMenu', () => {

  describe('normal', () => {

    beforeAll(() => {
      global.window.innerWidth = 1276;
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
      expect(links.length).toBe(11);
    });
    
    test('should render side menu with open item', async () => {
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      fireEvent.click(links[9]);
      let nLinks = view.container.querySelectorAll('a');
      expect(nLinks.length).toBe(14);
    });

    test('should close opened on link click', async () => {
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      fireEvent.click(links[9]);
      links = view.container.querySelectorAll('a');
      expect(links.length).toBe(14);
      fireEvent.click(links[1]);
      links = view.container.querySelectorAll('a');
      expect(links.length).toBe(11);
    });

    test('should active child', async () => {
      render(
        <MemoryRouter initialEntries={['/moderate/users']}>
          <SideMenu userStore={userStore} />
        </MemoryRouter>);
      let link = screen.getByText('Користувачі')
      expect(link.className).toBe('child active ');
    });

    test('should render adaptive if width < 1276', async () => {
      global.window.innerWidth = 1275;
      let view = render(
        <BrowserRouter>
          <SideMenu userStore={userStore} />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      expect(links.length).toBe(1);
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
      expect(links.length).toBe(1);
      let img = view.container.querySelector('img');
      expect(img).not.toBe(null);
      fireEvent.click(img);
      links = view.container.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(1);
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
      global.window.innerWidth = 1276;
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
      expect(links.length).toBe(4);
    });
    
    test('should not render require role childs', async () => {
      global.window.innerWidth = 1276;
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
      expect(links.length).toBe(9);
    });
  });
});