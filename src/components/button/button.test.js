import { render, screen, cleanup } from '@testing-library/react';
import Button from './button';
import '../../index.css';

afterEach(cleanup);

describe('Button', () => {

  test('should render normal button text', () => {
    render(<Button id='1' text='Test button'/>);
    const button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    //expect(button).toHaveStyle('background-color: var(--main-blue);');
    expect(button).toHaveStyle('color: white;');
    expect(button).toHaveStyle('outline-offset: 0px;');
    expect(button).toHaveStyle('border-radius: 7px;');
  });
  
  test('should render danger button text', () => {
    render(<Button danger id='1' text='Test button'/>);
    const button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    //expect(button).toHaveStyle('background-color: var(--danger);');
    expect(button).toHaveStyle('color: white;');
    expect(button).toHaveStyle('outline-offset: 0px;');
    expect(button).toHaveStyle('border-radius: 7px;');
  });
  
  test('should render outlined button text', () => {
    render(<Button outlined id='1' text='Test button'/>);
    const button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    expect(button).toHaveStyle('background-color: rgba(0, 0, 0, 0);');
    //expect(button).toHaveStyle('color: var(--main-blue);');
    expect(button).toHaveStyle('outline: 2px solid var(--secondary-blue);');
    expect(button).toHaveStyle('outline-offset: -2px;');
    expect(button).toHaveStyle('border-radius: 7px;');
  });
  
  test('should render outlined danger button text', () => {
    render(<Button outlined danger id='1' text='Test button'/>);
    const button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    expect(button).toHaveStyle('background-color: rgba(0, 0, 0, 0);');
    //expect(button).toHaveStyle('color: var(--danger);');
    expect(button).toHaveStyle('outline: 2px solid var(--danger);');
    expect(button).toHaveStyle('outline-offset: -2px;');
    expect(button).toHaveStyle('border-radius: 7px;');
  });

  test('should render disabled button text', () => {
    render(<Button disabled id='1' text='Test button'/>);
    let button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    expect(button).toHaveStyle('background-color: rgb(214, 214, 214);');
    expect(button).toHaveStyle('color: white;');
    expect(button).toHaveStyle('outline-offset: 0px;');
    expect(button).toHaveStyle('border-radius: 7px;');
  });

  test('should render disabled danger button text', () => {
    render(<Button disabled danger id='1' text='Test button'/>);
    let button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    expect(button).toHaveStyle('background-color: rgb(214, 214, 214);');
    expect(button).toHaveStyle('color: white;');
    expect(button).toHaveStyle('outline-offset: 0px;');
    expect(button).toHaveStyle('border-radius: 7px;');
  });

  test('should render disabled outlined button text', () => {
    render(<Button disabled danger id='1' text='Test button'/>);
    let button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    expect(button).toHaveStyle('background-color: rgb(214, 214, 214);');
    expect(button).toHaveStyle('color: white;');
    expect(button).toHaveStyle('outline-offset: 0px;');
    expect(button).toHaveStyle('border-radius: 7px;');
  });

  test('should render circle button text', () => {
    render(<Button circle id='1' text='Test button'/>);
    let button = screen.getByText(/Test button/i);
    expect(button.id).toBe('1');
    expect(button).toHaveStyle('border-radius: 20px;');
  });
  
}); 