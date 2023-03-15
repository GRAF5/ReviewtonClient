/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, cleanup, fireEvent, act} from '@testing-library/react';
import Form from './form';

afterEach(cleanup);

describe('Form', () => {

  test('should render empty form', async () => {
    let onSub = jest.fn();
    let view = render(<Form
      title='Test'
      button='Submit'
      onSubmit={onSub} />);
    const title = view.container.querySelector('h1');
    const button = view.container.querySelector('button');
    const inputs = view.container.querySelectorAll('input');
    expect(title.textContent).toBe('Test');
    expect(button.textContent).toBe('Submit');
    expect(inputs.length).toBe(0);
    fireEvent.click(button);
    expect(onSub).toHaveBeenCalledTimes(1);
  });

  test('should render form without title', async () => {
    let onSub = jest.fn();
    let view = render(<Form
      button='Submit'
      onSubmit={onSub} />);
    const title = view.container.querySelector('h1');
    expect(title).toBe(null);
  });

  test('should render input', async () => {
    let view = render(<Form
      elements={[
        {
          name: 'test', type: 'input', label: 'label'
        },
        {
          type: 'inp'
        }
      ]} />);
    const inputs = view.container.querySelectorAll('input');
    expect(inputs.length).toBe(1);
  });

  test('should calc form valid state', async () => {
    let view = render(<Form
      button='test'
      elements={[
        {
          name: 'test', type: 'input', label: 'label', required: true
        }
      ]} />);
    const button = view.container.querySelector('button');
    expect(button).toBeDisabled();
    const input = view.container.querySelector('input');
    fireEvent.change(input,{target: {value: 'test'}});
    expect(button).not.toBeDisabled();
  });

  test('should render form errors', async () => {
    let view = render(<Form
      formErrors={['error1', 'error2']} />);
    const lis = view.container.querySelectorAll('li');
    expect(lis.length).toBe(2);
    expect(lis[0].textContent).toBe('error1');
    expect(lis[1].textContent).toBe('error2');
  });

  test('should set input equal text', async () => {
    let view = render(<Form
      button='test'
      elements={[
        {
          name: 'test', type: 'input', label: 'label', equal: 'text'
        }
      ]} />);
    const button = view.container.querySelector('button');
     expect(button).toBeDisabled();
     const input = view.container.querySelector('input');
     fireEvent.change(input,{target: {value: 'text'}});
     expect(button).not.toBeDisabled();
  });

  test('should set input equal another input', async () => {
    let view = render(<Form
      button='test'
      elements={[
        {
          name: 'test', type: 'input', label: 'label'
        },
        {
          name: 'test1', type: 'input', label: 'label', equal: {input: 'test'}
        }
      ]} />);
    const button = view.container.querySelector('button');
     const inputs = view.container.querySelectorAll('input');
     fireEvent.change(inputs[0],{target: {value: 'text'}});
     expect(button).toBeDisabled();
     fireEvent.change(inputs[1],{target: {value: 'text'}});
     expect(button).not.toBeDisabled();
  });
});
