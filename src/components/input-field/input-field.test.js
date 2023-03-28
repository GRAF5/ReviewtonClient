import React from 'react';
import { render, cleanup, fireEvent, act} from '@testing-library/react';
import InputField from './input-field';

afterEach(cleanup);

describe('InputField', () => {

  test('should render only input', async () => {
    let view = render(<InputField id='1'/>);
    const label = view.container.querySelector('label');
    const input = view.container.querySelector('input');
    const p = view.container.querySelector('p');
    expect(label).toBe(null);
    expect(p).toBe(null);
    expect(input).not.toBe(null);
  });

  test('should render input with label', async () => {
    let view = render(<InputField id='1' label='Label'/>);
    const label = view.container.querySelector('label');
    const input = view.container.querySelector('input');
    const p = view.container.querySelector('p');
    expect(label).not.toBe(null);
    expect(label.textContent).toBe('Label');
    expect(p).toBe(null);
    expect(input).not.toBe(null);
  });

  test('should render input with help text', async () => {
    let view = render(<InputField id='1' helperText='Help'/>);
    const label = view.container.querySelector('label');
    const input = view.container.querySelector('input');
    const p = view.container.querySelector('p');
    expect(label).toBe(null);
    expect(p).not.toBe(null);
    expect(p.textContent).toBe('Help');
    expect(input).not.toBe(null);
  });

  test('should render input with error without help text', async () => {
    let view = render(<InputField id='1' helperText='Help' error='Error'/>);
    const label = view.container.querySelector('label');
    const input = view.container.querySelector('input');
    const p = view.container.querySelectorAll('p');
    expect(label).toBe(null);
    expect(p).not.toBe(null);
    expect(p.length).toBe(1);
    expect(p[0].textContent).toBe('Error');
    expect(input).not.toBe(null);
  });

  test('should render input with selected type', async () => {
    let view = render(<InputField id='1' type='submit'/>);
    const input = view.container.querySelector('input');
    expect(input.type).toBe('submit');
  });

  test('should render input with selected placeholder', async () => {
    let view = render(<InputField id='1' placeholder='placeholder'/>);
    const input = view.container.querySelector('input');
    expect(input.placeholder).toBe('placeholder');
  });

  // test('should use event beforeInput', async () => {
  //   let onBI = jest.fn();
  //   let view = render(<InputField id='1' onBeforeInput={onBI}/>);
  //   const input = view.container.querySelector('input');
  //   input.addEventListener('beforeinput', onBI);
  //   userEvent.type(input, 'test');
  //   fireEvent.input(input, 'test');
  //   console.log(onBI.mock.calls)
  //   expect(onBI).toHaveBeenCalledTimes(4);
  // });

  test('should validate min length', async () => {
    let onCh = jest.fn();
    let view = render(<InputField id='1' minLength={2} onChange={onCh}/>);
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 't'}});
    expect(onCh).toHaveBeenCalledTimes(3);
    expect(onCh.mock.calls[0][2]).toBe(false);
    fireEvent.change(input,{target: {value: 'te'}});
    expect(onCh).toHaveBeenCalledTimes(4);
    expect(onCh.mock.calls[3][2]).toBe(true);
  });

  test('should validate max length', async () => {
    let onCh = jest.fn();
    let view = render(<InputField id='1' maxLength={2} onChange={onCh}/>);
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 't'}});
    expect(onCh).toHaveBeenCalledTimes(3);
    expect(onCh.mock.calls[2][2]).toBe(true);
    fireEvent.change(input,{target: {value: 'tes'}});
    expect(onCh).toHaveBeenCalledTimes(4);
    expect(onCh.mock.calls[3][2]).toBe(false);
  });

  test('should validate pattern', async () => {
    let onCh = jest.fn();
    let view = render(<InputField id='1' pattern={/^test$/} onChange={onCh}/>);
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 'tset'}});
    expect(onCh).toHaveBeenCalledTimes(3);
    expect(onCh.mock.calls[2][2]).toBe(false);
    fireEvent.change(input,{target: {value: 'test'}});
    expect(onCh).toHaveBeenCalledTimes(4);
    expect(onCh.mock.calls[3][2]).toBe(true);
  });

  test('should validate equal', async () => {
    let onCh = jest.fn();
    let view = render(<InputField id='1' equal='test' onChange={onCh}/>);
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 'tset'}});
    expect(onCh).toHaveBeenCalledTimes(3);
    expect(onCh.mock.calls[0][2]).toBe(false);
    fireEvent.change(input,{target: {value: 'test'}});
    expect(onCh).toHaveBeenCalledTimes(4);
    expect(onCh.mock.calls[3][2]).toBe(true);
  });

  test('should add view/hide password', () => {
    let view = render(<InputField id='1' type='password'/>);
    const img = view.container.querySelector('svg');
    expect(img).not.toBe(null);
    expect(img.getAttribute('class')).toBe('eye-icon');
    fireEvent.click(img);
    expect(img.getAttribute('class')).toBe('eye-slash-icon');
  });

  test('should use props error', async () => {
    let view = render(<InputField id='1' label='label' error='Props Error' helperText='Helper text' />);
    const input = view.container.querySelector('input');
    const p = view.container.querySelector('p');
    const label = view.container.querySelector('label');
    expect(p.className.includes('error')).toBe(true);
    expect(p.textContent).toBe('Props Error');
    expect(label.className.includes('error')).toBe(true);
    expect(input.className.includes('error')).toBe(true);
  });

  test('should use helperText for error', async () => {
    let view = render(<InputField id='1' label='label' helperText='Helper text' required />);
    const input = view.container.querySelector('input');
    const p = view.container.querySelector('p');
    const label = view.container.querySelector('label');
    fireEvent.click(input);
    expect(p.className.includes('error')).toBe(true);
    expect(label.className.includes('error')).toBe(true);
    expect(input.className.includes('error')).toBe(true);
    expect(p.textContent).toBe('Helper text');
  });

  test('should set error for required', async () => {
    let view = render(<InputField id='1' label='label' required />);
    const input = view.container.querySelector('input');
    const p = view.container.querySelector('p');
    const label = view.container.querySelector('label');
    expect(input).not.toBe(null);
    fireEvent.click(input);
    expect(label.className.includes('error')).toBe(true);
    expect(input.className.includes('error')).toBe(true);
  });
});
