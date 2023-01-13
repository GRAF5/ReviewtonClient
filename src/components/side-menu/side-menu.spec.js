/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SideMenu from './side-menu';

afterEach(cleanup);

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
          <SideMenu />
        </BrowserRouter>);
      const links = view.container.querySelectorAll('a');
      expect(links.length).toBe(11);
    });
    
    test('should render side menu with open item', async () => {
      let view = render(
        <BrowserRouter>
          <SideMenu />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      fireEvent.click(links[9]);
      let nLinks = view.container.querySelectorAll('a');
      expect(nLinks.length).toBe(14);
    });

    test('should close opened on link click', async () => {
      let view = render(
        <BrowserRouter>
          <SideMenu />
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
          <SideMenu />
        </MemoryRouter>);
      let link = screen.getByText('Користувачі')
      expect(link.className).toBe('child active ');
    });

    test('should render adaptive if width < 1276', async () => {
      global.window.innerWidth = 1275;
      let view = render(
        <BrowserRouter>
          <SideMenu />
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
          <SideMenu />
        </BrowserRouter>);
      let links = view.container.querySelectorAll('a');
      expect(links.length).toBe(1);
      let img = view.container.querySelector('img');
      expect(img).not.toBe(null);
      fireEvent.click(img);
      links = view.container.querySelectorAll('a');
      expect(links.length).toBe(13);
    });
  })
});