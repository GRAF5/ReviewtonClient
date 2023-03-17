/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './input-field.css';

const InputField =React.forwardRef(({id, style, name, maxLength, type, error, placeholder, onChange, pattern, minLength, equal, label, helperText, onBeforeInput, onClick, reset, ...props}, ref) => {
  const [viewPass, setViewPass] = useState(false);
  const [data, setData] = useState({value: '', valid: false, touched: false});
  
  useEffect(() => {
    if (id) {
      document.getElementById(id).textContent = '';
    }
  }, [reset]);

  function handleChange(e) {
    const {value, textContent} = e.target;
    setData({...data, value: value || textContent, valid: isValid(value)});
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equal]);

  useEffect(() => {    
    if (onChange) {
      onChange(name, data.value, data.valid, data.touched);
    }
    // if (onBeforeInput) {
    //   onBeforeInput(id, data.value, data.valid);
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {
          props.resizeble ? 
            <div 
              id={id}
              name={name}
              className='resizeble-input'
              placeholder={placeholder}
              onInput={handleChange}
              onClick={handleClick}
              contentEditable={true} max={15}>
            </div>
          :
          <>
            <input
              className={'input-field '+(error || (!data.valid && data.touched) ? 'error' : '')}
              id={id}
              ref={ref}
              name={name}
              maxLength={maxLength}
              type={type && !viewPass ? type : 'text'}
              placeholder={placeholder ? placeholder : ''}
              onChange={handleChange}
              // onBeforeInput={handleBeforeInput}
              onClick={handleClick}
              style={type === 'password' ? {...(style || {}), 'paddingRight': '41px'} : {...(style || {})}}
              ></input>
            {
              type === 'password' ? 
                viewPass ? 
                <svg className='eye-slash-icon' style={{'marginLeft': '-41px'}} onClick={() => setViewPass(!viewPass)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" fill="currentColor"></path> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" fill="currentColor"></path> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" fill="currentColor"></path> </svg> 
                :
                <svg style={{'marginLeft': '-41px'}} className='eye-icon' onClick={() => setViewPass(!viewPass)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" fill="currentColor"></path> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="currentColor"></path> </svg> 
              : null
            }
          </>
        }
      </div>
      {helperComp}
    </div>
  )
})

export default InputField