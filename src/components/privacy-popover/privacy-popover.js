import React from 'react';
import useWindowSize from '../../utils/useWindowSize';
import Button from '../button/button';
import CustomLink from '../link/link';
import './privacy-popover.css';
import closeMenu from '../../icons/icons8-close.svg';
import { useState } from 'react';

export default function PrivacyPopover () {
  const [show, setShow] = useState(true);
  const {width, contentWidth} = useWindowSize();
  const isAccept = localStorage.getItem('privacy-accept');

  function agree() {
    localStorage.setItem('privacy-accept', true);
    setShow(false);
  }

  function close(e) {
    if (!e.key || e.key === 'Enter') {
      setShow(false);
    }
  }

  return (
    isAccept || !show ? null : 
      <div className='privacy-popover' >
        <div style={{
          'marginLeft': width >= 1276 ? `${(width - contentWidth) / 2}px` : `${(width - contentWidth) / 2}px`,
          'width': `${contentWidth - 40}px`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <p>Користуючись цим сайтом, ви погоджуєтесь на використання  файлів cookie
            і <CustomLink style={{color: 'white'}} to='/privacy-policy' text='Політикою конфіденційності' />
          </p>        
          <Button
            onClick={agree}
            style={{
              width: 'fit-content'
            }}
            text='Приймаю' />
          &nbsp;
          &nbsp;
          &nbsp;
          <img 
            className='menu'
            onClick={close}
            onKeyDown={close}
            tabIndex={0} 
            src={closeMenu} 
            alt='close' /> 
        </div>
      </div>
  );
}
