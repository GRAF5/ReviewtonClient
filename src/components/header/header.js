import { observer } from 'mobx-react-lite';
import React from 'react';
import useWindowSize from '../../utils/useWindowSize';
import AuthInfo from '../auth-info/auth-info';
import './header.css';

const Header = observer(({userStore}) => {
  const {width} = useWindowSize();
  const bodyW = width >= 576 ? 576 : width;
  function handleExit() {
    userStore.exit();
  }
  return (
    <div className='header'>
      <div className='center' style={{
        'marginLeft': `${(width - bodyW) / 2}px`,
        'width': `${bodyW}px`}}></div>
        {
          width >= 1276 ? <div className='right'> <AuthInfo user={userStore.user} onExit={handleExit} /> </div>:null
        }        
    </div>
  )
});

export default Header;