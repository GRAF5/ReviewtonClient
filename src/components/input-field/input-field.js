import React from 'react';
import './input-field.css';

export default function InputField({id, name, maxLength, type, error, placeholder, value, onChange, pattern, minLength, label, helperText}) {
  const labelComp = label ? <label className="field-label" htmlFor={id} >{label}</label> : null; 

  function handleChange(e) {
    onChange(e, isValid(e.target.value));
  }

  function isValid(value){
      const re = new RegExp(pattern);
      var patternValid = true;
      var minValid = true;
      var maxValid = true;
      if(pattern)
          patternValid = re.test(value);
      if(minLength)
          minValid = value.length >= minLength ? true : false;
      if(maxLength)
          maxValid = value.length <= maxLength ? true : false;
      return patternValid && minValid && maxValid;
  }

  return (
    <div className="input-field-form">
      {labelComp}
      <input
        className={"input-field "+(error?"error":"")}
        id={id}
        name={name}
        maxLength={maxLength}
        type={type ? type : 'text'}
        placeholder={placeholder ? placeholder : ''}
        value={value}
        onChange={handleChange}
        ></input>
        {
          (error && <p className="input-field-helpText error">{error}</p>) || 
          (helperText && <p className="input-field-helpText">{helperText}</p>)
        }
    </div>
  )
}