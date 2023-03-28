import React from 'react';
import './form-errors.css';
import PropTypes from 'prop-types';

export default function FormErrors({errors, ...props}) {
  return (
    errors && errors.length ? 
      <ul className='form-errors'>
        {errors.map((err, i) => <li key={i} className='form-error'>{err}</li>)}
      </ul> : null
  );
}

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};
