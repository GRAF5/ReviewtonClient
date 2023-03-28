import React from 'react';
import { Link } from 'react-router-dom';
import './link.css';
import PropTypes from 'prop-types';

export default function CustomLink({id, className, href, to, onClick, text, outlined, contained, replace, ...props}) {

  function handleClick() {
    // window.scroll(0, 0);
    if (onClick) {
      onClick();
    }
  }

  const clazz = `${className || ''} ${outlined ? 'outlined' : 0 || contained ? 'contained' : 0 || ''}`;
  return (
    href ? 
      <a id={id} className={clazz} href={href} onClick={onClick}>{text}</a> :
      <Link state={{}} preventScrollReset={false} 
        replace={replace} id={id} className={clazz} to={to} onClick={handleClick}>{text}</Link>
  );
}

CustomLink.propTypes = {
  id: PropTypes.any,
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  outlined: PropTypes.bool,
  contained: PropTypes.bool,
  replace: PropTypes.bool
};
