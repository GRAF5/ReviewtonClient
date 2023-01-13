import React from 'react';
import useWindowSize from '../../utils/useWindowSize';
import AuthInfo from '../auth-info/auth-info';
import './header.css';

export default function Header({...props}) {
  const {width} = useWindowSize();
  const bodyW = width >= 576 ? 576 : width;
  return (
    <div className='header'>
      <div className='center' style={{
        'marginLeft': `${(width - bodyW) / 2}px`,
        'width': `${bodyW}px`}}></div>
        {
          width >= 1276 ?<div className='right'> <AuthInfo /> </div>:null
        }        
    </div>
  )
}