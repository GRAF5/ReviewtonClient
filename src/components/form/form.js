import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import FormErrors from '../form-errors/form-errors';
import InputField from '../input-field/input-field';

/**
 * @typedef FormElement
 * @property {String} type type of element. Enum input
 * @property {String} name unique element name 
 * @property {Number} [maxLength] max value length used for input validation
 * @property {Number} [minLength] min value length used for input validation
 * @property {String} [pattern] pattern used for input validation
 * @property {String} [equal] value equal to. Used for input validation
 * @property {String} [inputType] input type used for input
 * @property {String} [error] element error
 * @property {String} [placeholder] input placeholder
 * @property {Boolean} [required] is input required
 * @property {String} [helperText] input helperText
 * @property {string} [label] input label
 */

/**
 * 
 * @param {Object} param0 
 * @param {String} param0.title form title 
 * @param {String} param0.button submit button text
 * @param {Array<String>} param0.formErrors array of form errors
 * @param {function(Array<string>)} param0.onSubmit function that handle submit
 * @param {Array<FormElement>} param0.elements array of form elements
 */
export default function Form({title, button, formErrors, elements = [], onSubmit, ...props}) {
  const [inputs, setInputs] = useState(getEmtpyElementObj());
  const [valid, setValid] = useState(getFalseElementObj());
  const [formValid, setFormValid] = useState(false);
  
  function getEmtpyElementObj() {
    let obj = {};
    for (let el of elements) {
      if (el.type === 'input') {
        obj[el.name] = '';
      }
    }
    return obj;
  }
  function getFalseElementObj() {
    let obj = {};
    for (let el of elements) {
      if (el.type === 'input') {
        obj[el.name] = !el.required;
      }
    }
    return obj;
  }
  function checkValid() {
    for (let el of Object.keys(valid)) {
      if (!valid[el]) {
        return false;
      }
    }
    return true;
  }
  function handleChange(id, value, isValid) {
    setInputs(inputs => ({...inputs, [id]:value}));
    setValid(valid => ({...valid, [id]: isValid}));
  }
  function submit(e) {
    e.preventDefault();
    onSubmit(inputs);
  }

  useEffect(() => {
    setFormValid(checkValid());
  }, [valid]);  

  return (
    <div className='form'>
      { title ? <h1 className='title-1'>{title}</h1> : null}
      <FormErrors errors={formErrors} />
      {
        elements.map((el, i) => {
          if (el.type === 'input'){
            return <div key={i} style={{'marginTop': '20px'}}><InputField 
              id={el.name} 
              name={el.name} 
              label={el.label}
              maxLength={el.maxLength}
              minLength={el.minLength}
              pattern={el.pattern}
              equal={el.equal ? el.equal.input ? inputs[el.equal.input] : el.equal : false}
              type={el.inputType} 
              helperText={el.helperText}
              error={el.error} 
              placeholder={el.placeholder}
              required={el.required}
              onChange={handleChange} /></div>
          } else {
            return null
          }
        })
      }
      <div style={{'marginTop': '20px'}}><Button disabled={!formValid} text={button} onClick={submit}/></div>
    </div>
  )
}