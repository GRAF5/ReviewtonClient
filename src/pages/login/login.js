import React from 'react';
import CustomLink from '../../components/link/link';

export default function Login({...props}) {

  return (<>
  <h1>Login</h1>
  <CustomLink to='/' text={'Main'} />
  <CustomLink to='/register' text={'Register'} />
  </>)
}