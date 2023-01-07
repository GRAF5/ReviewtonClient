import { render, screen, cleanup } from '@testing-library/react';
import Button from './button';

afterEach(cleanup);

describe('Button', () => {

  test('should render normal button text', () => {
    render(<Button id='1' text='Test button'/>);
    const linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('background-color: rgb(25, 65, 223);');
    expect(linkElement).toHaveStyle('color: white;');
    expect(linkElement).toHaveStyle('outline-offset: 0px;');
    expect(linkElement).toHaveStyle('border-radius: 7px;');
  });
  
  test('should render danger button text', () => {
    render(<Button danger id='1' text='Test button'/>);
    const linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('background-color: rgb(255, 84, 84);');
    expect(linkElement).toHaveStyle('color: white;');
    expect(linkElement).toHaveStyle('outline-offset: 0px;');
    expect(linkElement).toHaveStyle('border-radius: 7px;');
  });
  
  test('should render outlined button text', () => {
    render(<Button outlined id='1' text='Test button'/>);
    const linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('background-color: rgba(0, 0, 0, 0);');
    expect(linkElement).toHaveStyle('color: rgb(25, 65, 223);');
    expect(linkElement).toHaveStyle('outline: 2px solid #1941DF;');
    expect(linkElement).toHaveStyle('outline-offset: -2px;');
    expect(linkElement).toHaveStyle('border-radius: 7px;');
  });
  
  test('should render outlined danger button text', () => {
    render(<Button outlined danger id='1' text='Test button'/>);
    const linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('background-color: rgba(0, 0, 0, 0);');
    expect(linkElement).toHaveStyle('color: rgb(255, 84, 84);');
    expect(linkElement).toHaveStyle('outline: 2px solid #FF5454;');
    expect(linkElement).toHaveStyle('outline-offset: -2px;');
    expect(linkElement).toHaveStyle('border-radius: 7px;');
  });

  test('should render disabled button text', () => {
    render(<Button disabled id='1' text='Test button'/>);
    let linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('background-color: rgb(214, 214, 214);');
    expect(linkElement).toHaveStyle('color: white;');
    expect(linkElement).toHaveStyle('outline-offset: 0px;');
    expect(linkElement).toHaveStyle('border-radius: 7px;');
  });

  test('should render disabled danger button text', () => {
    render(<Button disabled danger id='1' text='Test button'/>);
    let linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('background-color: rgb(214, 214, 214);');
    expect(linkElement).toHaveStyle('color: white;');
    expect(linkElement).toHaveStyle('outline-offset: 0px;');
    expect(linkElement).toHaveStyle('border-radius: 7px;');
  });

  test('should render disabled outlined button text', () => {
    render(<Button disabled danger id='1' text='Test button'/>);
    let linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('background-color: rgb(214, 214, 214);');
    expect(linkElement).toHaveStyle('color: white;');
    expect(linkElement).toHaveStyle('outline-offset: 0px;');
    expect(linkElement).toHaveStyle('border-radius: 7px;');
  });

  test('should render circle button text', () => {
    render(<Button circle id='1' text='Test button'/>);
    let linkElement = screen.getByText(/Test button/i);
    expect(linkElement.id).toBe('1');
    expect(linkElement).toHaveStyle('border-radius: 20px;');
  });
  
}); 