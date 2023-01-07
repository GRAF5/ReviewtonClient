import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color:${(props) => props.disabled ? '#D6D6D6' : props.outlined ? rgba(0, 0, 0, 0) : props.danger ? '#FF5454' : '#1941DF'};
  color: ${(props) => props.outlined && !props.disabled ? props.danger ? '#FF5454' : '#1941DF' : 'white'};
  outline: ${(props) => props.outlined && !props.disabled ? props.danger ? '2px solid #FF5454' : '2px solid #1941DF' : '0px'};
  outline-offset: ${(props) => props.outlined ? '-2px' : '0px'};
  padding: 5px 20px;
  border-radius: ${(props) => props.circle ? '20px' : '7px'};
  height: ${(props) => props.circle ? '35px' : 'auto'};
  border: 0px;
  cursor: pointer;
  `;

export default function Button({id, text, name, onClick, ...props}) {

  return (
    <StyledButton id = {id} onClick = {onClick} name = {name} {...props}>{text}</StyledButton>
  )
}