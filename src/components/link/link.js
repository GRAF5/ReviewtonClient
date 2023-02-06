import React from 'react';
import { Link } from 'react-router-dom';
import './link.css';

export default function CustomLink({id, className, href, to, onClick, text, ...props}) {

  const clazz = (className ? className : '') + ' ' + (props.outlined ? 'outlined' : 0 || props.contained ? 'contained' : 0 || '')
  return (
    href ? 
      <a id={id} className={clazz} href={href} onClick={onClick}>{text}</a>
    :
      <Link replace={props.replace} id={id} className={clazz} to={to} onClick={onClick}>{text}</Link>
  );
}