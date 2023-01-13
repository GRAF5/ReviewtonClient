import React from 'react';
import Button from '../../components/button/button';
import InputField from '../../components/input-field/input-field';
import CustomLink from '../../components/link/link';

export default function Main({...props}) {

  return (<>
  <h1>Main</h1>
  <CustomLink to='/' text={'Main'} />
  <Button circle danger text={'Main'} />
  <CustomLink contained to='/register' text={'Register'} />
  <Button text={'Register'} />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  <InputField error='Test error' label='Test label' helperText='Test helper text' />
  </>)
}