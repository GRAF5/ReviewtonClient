import React from 'react';
import { Link } from 'react-router-dom';
import './link.css';

export default function CustomLink({href, to, onClick, text, ...props}) {

  return (
    href ? 
      <a className={props.outlined ? 'outlined' : 0 || props.contained ? 'contained' : 0 || ''} href={href} onClick={onClick}><span>{text}</span></a>
    :
      <Link className={props.outlined ? 'outlined' : 0 || props.contained ? 'contained' : 0 || ''} to={to} onClick={onClick}><span>{text}</span></Link>
  );
}