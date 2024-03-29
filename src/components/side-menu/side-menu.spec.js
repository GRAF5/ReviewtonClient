import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SideMenu from './side-menu';
import sideMenuOptions from './sideMenuOptions';

const normalWidth = (+process.env.REACT_APP_CONTENT_WIDTH) + 340 * 2 + 1;
const adaptiveWidth = (+process.env.REACT_APP_CONTENT_WIDTH) + 340 * 2 - 1;
afterEach(cleanup);
let userStore = {
  user: {id: 'id'}, 
  checkAccessByRole: () => {return true;}
};
describe('SideMenu', () => {

  test('empty', () => {

  });
});

// describe('normal', () => {

//   beforeAll(() => {
//     global.window.innerWidth = maxWidth;
//   });

//   afterAll(() => {
//     global.window.innerWidth = 1024;
//   });
  
//   test('should render side menu', () => {
//     let view = render(
//       <BrowserRouter>
//         <SideMenu userStore={userStore} open={true} />
//       </BrowserRouter>);
//     const links = view.container.querySelectorAll('a');
//     expect(links.length).toBe(5);
//   });
  
//   test('should render side menu with open item', async () => {
//     let view = render(
//       <BrowserRouter>
//         <SideMenu userStore={userStore} open={true} />
//       </BrowserRouter>);
//     let links = view.container.querySelectorAll('a');
//     fireEvent.click(links[links.length - 1]);
//     let nLinks = view.container.querySelectorAll('a');
//     expect(nLinks.length).toBe(5);
//   });

//   test('should close opened on link click', async () => {
//     let view = render(
//       <BrowserRouter>
//         <SideMenu userStore={userStore} open={true} />
//       </BrowserRouter>);
//     let links = view.container.querySelectorAll('a');
//     fireEvent.click(links[links.length - 1]);
//     links = view.container.querySelectorAll('a');
//     expect(links.length).toBe(5);
//     fireEvent.click(links[1]);
//     links = view.container.querySelectorAll('a');
//     expect(links.length).toBe(5);
//   });

//   test('should active child', async () => {
//     render(
//       <MemoryRouter initialEntries={['/moderate/users']}>
//         <SideMenu userStore={userStore} open={true} />
//       </MemoryRouter>);
//     let link = screen.getByText('Користувачі');
//     expect(link.className).toBe('child active ');
//   });

//   test('should render adaptive if width < maxWidth', async () => {
//     global.window.innerWidth = maxWidth - 100;
//     let view = render(
//       <BrowserRouter>
//         <SideMenu userStore={userStore} open={false} />
//       </BrowserRouter>);
//     let links = view.container.querySelectorAll('a');
//     expect(links.length).toBe(0);
//     let img = view.container.querySelector('img');
//     expect(img).not.toBe(null);
//   });

//   test('should render items in adaptive mode', async () => {
//     global.window.innerWidth = maxWidth - 100;
//     let view = render(
//       <BrowserRouter>
//         <SideMenu userStore={userStore} open={false} />
//       </BrowserRouter>);
//     let links = view.container.querySelectorAll('a');
//     expect(links.length).toBe(0);
//     let img = view.container.querySelector('img');
//     expect(img).not.toBe(null);
//     fireEvent.click(img);
//     links = view.container.querySelectorAll('a');
//     expect(links.length).toBeGreaterThan(0);
//   });
  
//   test('should handle exit', async () => {
//     global.window.innerWidth = maxWidth;
//     let store = {
//       user: {id: 'id'},
//       exit: jest.fn(), 
//       checkAccessByRole: () => {}
//     };
//     let view = render(
//       <MemoryRouter>
//         <SideMenu userStore={store} open={false} />
//       </MemoryRouter>
//     );
//     let img = view.container.querySelector('img');
//     fireEvent.click(img);
//     const button = view.container.querySelector('button');
//     fireEvent.click(button);
//     expect(store.exit).toBeCalledTimes(1);
//   });
  
//   test('should not render require auth childs', async () => {
//     global.window.innerWidth = maxWidth;
//     let store = {
//       user: null,
//       checkAccessByRole: () => {}
//     };
//     let view = render(
//       <MemoryRouter>
//         <SideMenu userStore={store} open={true} />
//       </MemoryRouter>
//     );
//     let links = view.container.querySelectorAll('a');
//     expect(links.length).toBe(6);
//   });
  
//   test('should not render require role childs', async () => {
//     global.window.innerWidth = maxWidth;
//     let store = {
//       user: {id: 'id'},
//       checkAccessByRole: () => { return false; }
//     };
//     let view = render(
//       <MemoryRouter>
//         <SideMenu userStore={store} open={true} />
//       </MemoryRouter>
//     );
//     let links = view.container.querySelectorAll('a');
//     expect(links.length).toBe(8);
//   });
// });
// });
