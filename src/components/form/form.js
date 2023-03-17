import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import FormErrors from '../form-errors/form-errors';
import InputField from '../input-field/input-field';
import './form.css';

/**
 * @typedef FormElement
 * @property {String} type type of element. Enum input, button, reset
 * @property {String} id unique id 
 * @property {String} name unique element name 
 * @property {String} [label] input label
 * @property {Number} [maxLength] max value length used for input validation
 * @property {Number} [minLength] min value length used for input validation
 * @property {String} [pattern] pattern used for input validation
 * @property {String} [equal] value equal to. Used for input validation
 * @property {String} [inputType] input type used for input
 * @property {String} [helperText] input helperText
 * @property {String} [error] element error
 * @property {String} [placeholder] input placeholder
 * @property {Boolean} [required] is input required
 * @property {Boolean} [resizeble] is input resizeble
 * @property {Boolean} [outlined] is button outlined style
 * @property {Boolean} [danger] is button danger style
 * @property {String} [text] button text
 * @property {Array<String>} [values] values that returned on click
 */

/**
 * Render custom form
 * @param {Object} param0 
 * @param {String} param0.title form title 
 * @param {String} param0.button submit button text
 * @param {Array<String>} param0.formErrors array of form errors
 * @param {function(Array<string>)} param0.onSubmit function that handle submit
 * @param {Array<FormElement>} param0.elements array of form elements
 */
export default function Form({title, button, formErrors, elements = [], onSubmit, ...props}) {
  const [inputs, setInputs] = useState(getEmtpyElementObj());
  const [reset, setReset] = useState(0);
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
  function handleChange(name, value, isValid) {
    setInputs(inputs => ({...inputs, [name]:value}));
    setValid(valid => ({...valid, [name]: isValid}));
  }
  function submit(e) {
    e.preventDefault();
    onSubmit(inputs);
  }
  function getValues(values = []) {
    let res = {};
    values.forEach(el => res[el] = inputs[el]);
    return res;
  }
  function createElement(el, key) {
    return <div key={key} style={{'marginTop': '10px', 'display': 'flex', 'alignItems': 'end'}}>
      {getEl(el, `/${key}`)}
    </div>
  }
  function getEl(el, key) {
    if (el.type === 'input') {
      return (
        <>
        <InputField
          key={key}
          id={el.id} 
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
          resizeble={el.resizeble}
          onChange={handleChange}
          reset={reset} />
        {el.inlines ? el.inlines.map((ch, i) => <>&nbsp;{getEl(ch, `${key}/${i}`)}</>) : null}
        </>)
    } else if (el.type === 'button' || el.type === 'reset') {
      return <Button 
        key={key} 
        style={{'width': 'fit-content'}} 
        outlined={el.outlined} 
        danger={el.danger} 
        text={el.text} 
        onClick={() => {
          el.onClick(getValues(el.values));
          if (el.type === 'reset') {
            setReset(reset + 1);
          }
        }} 
        onKeyDown={(e) => {
          if (!e.key || e.key === 'Enter') {
            el.onClick(getValues(el.values));
          }
         }} 
        />
    }  else {
      return null
    }
  }

  useEffect(() => {
    setFormValid(checkValid());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid]);  

  return (
    <div className='form'>
      { title ? <h1 className='title-1'>{title}</h1> : null}
      <FormErrors key={'errors'} errors={formErrors} />
      {
        elements.map((el, i) => createElement(el, i))
      }
      {
        button ? <div style={{'marginTop': '20px'}}><Button disabled={!formValid} text={button} onClick={submit}/></div>
        : null
      }
    </div>
  )
}