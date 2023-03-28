import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomLink from './link';

afterEach(cleanup);

describe('CustomLink', () => {

  describe('href', () => {
    test('should render link with href', async () => {
      let view = render(<CustomLink href='/test'/>);
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.href).toBe('http://localhost/test');
      expect(a.className).toBe(' ');
    });

    test('should render link with className', async () => {
      let view = render(<CustomLink className='test' href='/test'/>);
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.className).toBe('test ');
    });
  
    test('should render outlined href link', async () => {
      let view = render(<CustomLink outlined href='/test'/>);
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.className).toBe(' outlined');
    });

    test('should render outlined link with className', async () => {
      let view = render(<CustomLink outlined className='test' href='/test'/>);
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.className).toBe('test outlined');
    });
  
    test('should render contained href link', async () => {
      let view = render(<CustomLink contained href='/test'/>);
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.className).toBe(' contained');
    });

    test('should render contained link with className', async () => {
      let view = render(<CustomLink contained className='test' href='/test'/>);
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.className).toBe('test contained');
    });
  });

  describe('to', () => {

    test('should render link with to', async () => {
      let view = render(
        <BrowserRouter>
          <CustomLink to='/test'/>
        </BrowserRouter>
      );
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.href).toBe('http://localhost/test');
      expect(a.className).toBe(' ');
    });
  
    test('should render outlined to link', async () => {
      let view = render(
        <BrowserRouter>
          <CustomLink outlined to='/test'/>
        </BrowserRouter>
      );
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.className).toBe(' outlined');
    });
  
    test('should render contained to link', async () => {
      let view = render(
        <BrowserRouter>
          <CustomLink contained to='/test'/>
        </BrowserRouter>
      );
      const a = view.container.querySelector('a');
      expect(a).not.toBe(null);
      expect(a.className).toBe(' contained');
    });
  });
});
