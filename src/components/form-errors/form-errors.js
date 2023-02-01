import React from 'react';
import './form-errors.css';

export default function FormErrors({errors, ...props}) {

  return(
    errors && errors.length ? 
      <ul className='form-errors'>
        {errors.map((err, i) => <li key={i} className='form-error'>{err}</li>)}
      </ul>
    : null
  )
}