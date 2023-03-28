import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  background-color:${(props) => props.disabled ? 
    '#D6D6D6' : props.outlined ? rgba(0, 0, 0, 0) : props.danger ? 'var(--danger)' : 'var(--main-blue)'};
  color: ${(props) => props.outlined && !props.disabled ? 
    props.danger ? 'var(--danger)' : 'var(--secondary-blue)' : 'white'};
  outline: ${(props) => props.outlined && !props.disabled ? 
    props.danger ? '2px solid var(--danger)' : '2px solid var(--secondary-blue)' : '0px'};
  outline-offset: ${(props) => props.outlined ? '-2px' : '0px'};
  padding: 5px 20px;
  border-radius: ${(props) => props.circle ? '20px' : '7px'};
  border: 0px;
  cursor: pointer;
  width: 100%;
  min-height: 41px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center
  `;

export default function Button({id, text, name, onClick, children, ...props}) {

  return (
    <StyledButton id = {id} onClick = {onClick} name = {name} {...props}>{text || children}</StyledButton>
  );
}

Button.propTypes = {
  id: PropTypes.any,
  text: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.element
};
