import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import InputField from '../input-field/input-field';
import './autocomplete.css';
import PropTypes from 'prop-types';

export default function Autocomplete({
  id, 
  options, 
  button, 
  name, 
  maxLength, 
  error, 
  placeholder, 
  onChange, 
  valueProp,
  minLength, label, helperText, onClick, required, ...props}) {
  const [data, setData] = useState({value: '', valid: false, touched: false});
  const [popoverVisible, setPopoverVisible] = useState(false);
  // const [filteredOptions, setFilteredOptions] = useState(options);
  const [popover, setPopover] = useState(); 
  const [buttonComp, setButtonComp] = useState();
  const [inputTop, setInputTop] = useState();
  const [input, setInputRef] = useState(null);
  const buttonRef = React.useRef();
  const [helperRef, setHelperRef] = useState();
  const autocomplete = React.useRef();

  useEffect(() => {
    setPopover(getPopover(input));
    onChange(name, data.value, data.valid);
  }, [data, options]);
  function handleInput(inputName, value, valid, touched) {
    setData({value, valid, touched});
  }
  function handleFocus(e) {
    setPopoverVisible(true);
  }
  function handleBlur(e) {
    if (!e.relatedTarget || e.relatedTarget.className !== `${name} option`) {
      setPopoverVisible(false);
    }
  }
  function getPopover(el) {
    if (!el) {
      return;
    }
    let filteredOptions;
    if (el.value === '') {
      filteredOptions = options;
    } else {
      filteredOptions = options.filter(o => o.toUpperCase().includes(data.value.toUpperCase()));
    }
    return (
      filteredOptions.length ?
        <div className='popover'
          style={{
            transform: `translate(0px, -${helperRef ? helperRef.offsetHeight + 3 : 0}px)`,
            width: `${el.offsetWidth}px`,
            zIndex: 5
          }}
        >
          <ul >
            {
              filteredOptions.map((o, i) => 
                <li 
                  onClick={(e) => onOption(e, o)} onKeyDown={(e) => onOption(e, o)} 
                  className={`${name} option`} tabIndex={0} key={i}>{o}</li>)}
          </ul>
        </div> : null
    );
  }
  function onOption(e, option) {
    if (!e.key || e.key === 'Enter') {
      setData({...data, value: option});
      setPopoverVisible(false);
      let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(input, option);
      let ev2 = new Event('input', { bubbles: true});
      input.dispatchEvent(ev2);
    }
  }
  function onButton(e) {
    button.onClick(data.value);
    if (button.reset) {
      let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(input, '');
      let ev2 = new Event('input', { bubbles: true});
      input.dispatchEvent(ev2);
      e.currentTarget.blur();
    }
  }

  return (
    <div
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={autocomplete} >
      <div>
        <InputField
          ref={ref => { 
            if (button && ref) {
              setInputTop(ref.offsetTop);
            }
            setInputRef(ref);
          }}
          valueProp={data.value || valueProp}
          setHelperRef={setHelperRef}
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
          button={button}
          style={{
            paddingRight: `${buttonRef.current ? buttonRef.current.offsetWidth + 14 : 0}px`
          }}
        />
        {/* { button && input ? 
          <div
            ref={buttonRef}
            style={{          
              transform: `translateX(calc(${input.offsetWidth}px - 100%))`,
              top: `${inputTop}px`,
              position: 'absolute'
            }}><Button
              style={{borderRadius: '0 7px 7px 0'}}
              className={'button'} text={button.text} onClick={onButton}>{button.childs}</Button></div> : null
        } */}
      </div>
      { popoverVisible ? popover : null}
    </div>);
}

Autocomplete.propTypes = {
  id: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  button: PropTypes.object,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  minLength: PropTypes.number,
  label: PropTypes.string,
  helperText: PropTypes.string,
  onClick: PropTypes.func,
  required: PropTypes.bool,
  valueProp: PropTypes.string
};
