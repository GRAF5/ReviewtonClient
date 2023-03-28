import { cleanup, fireEvent, render } from '@testing-library/react';
import useWindowSize from './useWindowSize';
import React from 'react';

afterEach(cleanup);

function TestComponent() {
  const {width, height} = useWindowSize();
  return `width ${width} height ${height}`;
}

describe('useWindowSize', () => {
  const { window } = global;
  afterEach(() => {
    global.window = window;
  });

  test('should return window size', () => {
    global.window.innerWidth = 1920;
    global.window.innerHeight = 1024;
    let view = render(<TestComponent />);
    expect(view.container.textContent).toBe('width 1920 height 1024');
    global.window.innerWidth = 1024;
    global.window.innerHeight = 768;
    fireEvent(window, new Event('resize'));
    expect(view.container.textContent).toBe('width 1024 height 768');
  });
});

