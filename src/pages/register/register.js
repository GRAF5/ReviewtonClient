import React from 'react';
import CustomLink from '../../components/link/link';

export default function Register({...props}) {

  return (<><h1>Register</h1>
  <CustomLink to='/' text={'Main'} />
  <CustomLink to='/login' text={'Login'} /></>)
}