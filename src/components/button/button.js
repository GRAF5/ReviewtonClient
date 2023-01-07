import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

export default function Button({id, text, name, onClick, ...props}) {

  const Button = styled.button`
    background-color:${props.disabled ? '#D6D6D6' : props.outlined ? rgba(0, 0, 0, 0) : props.danger ? '#FF5454' : '#1941DF'};
    color: ${props.outlined && !props.disabled ? props.danger ? '#FF5454' : '#1941DF' : 'white'};
    border: ${props.outlined && !props.disabled ? props.danger ? '2px solid #FF5454' : '2px solid #1941DF' : '0px'};
    padding: 5px 20px;
    border-radius: ${props.circle ? '20px' : '7px'};
    font-size: 18px;
    height: ${props.circle ? '35px' : '35px'};
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  `;

  return (
    <Button id = {id} onClick = {onClick} name = {name}>{text}</Button>
  )
}