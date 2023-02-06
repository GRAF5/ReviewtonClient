/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { userService } from './user.service';
import React, { useState } from 'react';


afterEach(cleanup);


describe('UserService', () => {
  const fakeRes = {
    token: 'token',
    id: 'id'
  };
  beforeEach(async () => {

  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(fakeRes)
  }))});

  afterAll(() => {
    localStorage.clear();
  });

  test('should fetch user authenticate', async () => {
    function TestComponent() {
      const [data, setData] = useState('');
      
      return (
      <>
        <button onClick={() => userService.authenticate({}).then(res => setData(JSON.stringify(res)))} />
        {data ? <p>{data}</p> : null}
      </>);
    }
    let view = render(<TestComponent />);
    const button = view.container.querySelector('button');
    fireEvent.click(button);
    const p = await screen.findByText(JSON.stringify(fakeRes));
    expect(p).not.toBe(null);
  });

  test('should fetch user register', async () => {
    function TestComponent() {
      const [data, setData] = useState('');
      
      return (
      <>
        <button onClick={() => userService.register({}).then(res => setData(JSON.stringify(res)))} />
        {data ? <p>{data}</p> : null}
      </>);
    }
    let view = render(<TestComponent />);
    const button = view.container.querySelector('button');
    fireEvent.click(button);
    const p = await screen.findByText(JSON.stringify(fakeRes));
    expect(p).not.toBe(null);
  });

  test('should fetch current', async () => {
    localStorage.setItem('token', 'token');
    function TestComponent() {
      const [data, setData] = useState('');
      
      return (
      <>
        <button onClick={() => userService.current({}).then(res => setData(JSON.stringify(res)))} />
        {data ? <p>{data}</p> : null}
      </>);
    }
    let view = render(<TestComponent />);
    const button = view.container.querySelector('button');
    fireEvent.click(button);
    const p = await screen.findByText(JSON.stringify(fakeRes));
    expect(p).not.toBe(null);
  });
});