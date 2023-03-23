import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import InputField from '../input-field/input-field';
import './autocomplete.css'

export default function Autocomplete({id, options, button, name, maxLength, type, error, placeholder, onChange, minLength, label, helperText, onBeforeInput, onClick, required, ...props}) {
  const [data, setData] = useState({value: '', valid: false, touched: false});
  const [popoverVisible, setPopoverVisible] = useState(false);
  // const [filteredOptions, setFilteredOptions] = useState(options);
  const [popover, setPopover] = useState(); 
  const input = React.useRef();
  const buttonRef = React.useRef();
  const autocomplete = React.useRef();

  useEffect(() => {
    setPopover(getPopover(input));
    onChange(name, data.value, data.valid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, options]);
  function handleInput(name, value, valid, touched) {
    setData({value, valid, touched});
  }
  function handleFocus(e) {
    setPopoverVisible(true);
  }
  function handleBlur(e) {
    if(!e.relatedTarget || e.relatedTarget.className !== `${name} option`){
      setPopoverVisible(false);
    }
  }
  function getPopover(el) {
    let filteredOptions;
    if (el.current.value === '') {
      filteredOptions = options;
    } else {
      filteredOptions = options.filter(o => o.toUpperCase().includes(data.value.toUpperCase()));
    }
    return (
      filteredOptions.length ?
      <div className='popover'
        style={{
          transform: `translate(0px, ${data.valid ? 0 : -27}px)`,
          width: `${el.current.offsetWidth}px`,
          zIndex: 5
        }}
      >
        <ul >
          {filteredOptions.map((o, i) => <li onClick={(e) => onOption(e, o)} onKeyDown={(e) => onOption(e, o)} className={`${name} option`} tabIndex={0} key={i}>{o}</li>)}
        </ul>
      </div>: null
    )
  }
  function onOption(e, option) {
    if (!e.key || e.key === 'Enter') {
      setData({...data, value: option});
      setPopoverVisible(false);
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeInputValueSetter.call(input.current, option);
      let ev2 = new Event('input', { bubbles: true});
      input.current.dispatchEvent(ev2);
    }
  }
  function onButton(e) {
    button.onClick(data.value);
    if (button.reset) {
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeInputValueSetter.call(input.current, '');
      let ev2 = new Event('input', { bubbles: true});
      input.current.dispatchEvent(ev2);
      e.currentTarget.blur();
    }
  }

  return(
  <div
    onFocus={handleFocus}
    onBlur={handleBlur}
    ref={autocomplete} >
    <InputField
      ref={input}
      id={`autocomplete-${name}-${id}`}
      name={name}
      minLength={required ? 1 : 0}
      maxLength={maxLength}
      type={'text'}
      error={error}
      placeholder={placeholder}
      onChange={handleInput}
      label={label}
      helperText={helperText}
      onClick={onClick}
      style={{
        paddingRight: `${buttonRef.current ? buttonRef.current.offsetWidth + 14 : 0}px`
      }}
    />
    {button && input.current ? <div
      ref={buttonRef}
      style={{          
        transform: `translateX(calc(${input.current.offsetWidth}px - 100%))`,
        top: `${input.current.offsetTop}px`,
        position: 'absolute'
        }}><Button
          className={'button'} text={button.text} onClick={onButton}>{button.childs}</Button></div> : null}
    { popoverVisible ? popover : null}
  </div>);
}