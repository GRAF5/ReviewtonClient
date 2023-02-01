import React, { useEffect, useState } from 'react';
import './input-field.css';

export default function InputField({id, name, maxLength, type, error, placeholder, onChange, pattern, minLength, equal, label, helperText, onBeforeInput, onClick, ...props}) {
  const [viewPass, setViewPass] = useState(false);
  const [data, setData] = useState({value: '', valid: false, touched: false});
  
  function handleChange(e) {
    const {value} = e.target;
    setData({...data, value, valid: isValid(value)});
  }

  // function handleBeforeInput(e) {
  //   const {value} = e.target;
  //   setData({value, valid: isValid(value)});
  // }

  function handleClick(e) {
    setData({...data, touched: true});
  }

  function isValid(value) {
      const re = new RegExp(pattern);
      let patternValid = true;
      let minValid = true;
      let maxValid = true;
      let isEqual = true;
      if (pattern) {
        patternValid = re.test(value);
      }
      if (minLength || props.required) {
        minValid = value.length >= (minLength || 1) ? true : false;
      }
      if (maxLength) {
        maxValid = value.length <= maxLength ? true : false;
      }
      if (equal) {
        isEqual = value === equal;
      }
      return patternValid && minValid && maxValid && isEqual;
  }

  useEffect(() => {
    setData({...data, valid: isValid(data.value)});
  }, [equal]);

  useEffect(() => {    
    if (onChange) {
      onChange(id, data.value, data.valid);
    }
    // if (onBeforeInput) {
    //   onBeforeInput(id, data.value, data.valid);
    // }
  }, [data]);


  const labelComp = label ? <label className={'field-label '+(error || (!data.valid && data.touched) ? 'error' : '')} htmlFor={id} >{label}</label> : null; 
  const helperComp = error || (!data.valid && data.touched) ? 
    <p className='input-field-helpText error'>{error || helperText || 'Необхідно заповнити поле'}</p> :
    helperText ?
      <p className='input-field-helpText'>{helperText}</p> : 
      null;

  return (
    <div className='input-field-form'>
      {labelComp}
      <div style={{
        'display': 'flex',
        'alignItems': 'center'
        }}>
        <input
          className={'input-field '+(error || (!data.valid && data.touched) ? 'error' : '')}
          id={id}
          name={name}
          maxLength={maxLength}
          type={type && !viewPass ? type : 'text'}
          placeholder={placeholder ? placeholder : ''}
          onChange={handleChange}
          // onBeforeInput={handleBeforeInput}
          onClick={handleClick}
          style={type === 'password' ? {'paddingRight': '41px'} : {}}
          ></input>
          {
            type === 'password' ? 
            <img alt='view pass' style={{'marginLeft': '-41px'}} className={viewPass ? 'eye-slash-icon' : 'eye-icon'} onClick={() => setViewPass(!viewPass)} /> : null
          }
      </div>
      {helperComp}
    </div>
  )
}