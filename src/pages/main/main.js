import React from 'react';
import Button from '../../components/button/button';
import CustomLink from '../../components/link/link';

export default function Main({...props}) {

  return (<><h1>Main</h1>
  <CustomLink outlined to='/' text={'Main'} />
  <Button circle text={'Main'} />
  <CustomLink contained to='/register' text={'Register'} />
  <Button text={'Register'} /></>)
}