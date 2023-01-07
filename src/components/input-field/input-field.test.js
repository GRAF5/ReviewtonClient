/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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

  test('should validate min length', async () => {
    let onCh = jest.fn();
    let view = render(<InputField id='1' minLength={2} onChange={onCh}/>);
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 't'}});
    expect(onCh).toHaveBeenCalledTimes(1);
    expect(onCh.mock.calls[0][1]).toBe(false);
    fireEvent.change(input,{target: {value: 'te'}});
    expect(onCh).toHaveBeenCalledTimes(2);
    expect(onCh.mock.calls[1][1]).toBe(true);
  });

  test('should validate max length', async () => {
    let onCh = jest.fn();
    let view = render(<InputField id='1' maxLength={2} onChange={onCh}/>);
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 't'}});
    expect(onCh).toHaveBeenCalledTimes(1);
    expect(onCh.mock.calls[0][1]).toBe(true);
    fireEvent.change(input,{target: {value: 'tes'}});
    expect(onCh).toHaveBeenCalledTimes(2);
    expect(onCh.mock.calls[1][1]).toBe(false);
  });

  test('should validate pattern', async () => {
    let onCh = jest.fn();
    let view = render(<InputField id='1' pattern={/^test$/} onChange={onCh}/>);
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 'tset'}});
    expect(onCh).toHaveBeenCalledTimes(1);
    expect(onCh.mock.calls[0][1]).toBe(false);
    fireEvent.change(input,{target: {value: 'test'}});
    expect(onCh).toHaveBeenCalledTimes(2);
    expect(onCh.mock.calls[1][1]).toBe(true);
  });
});