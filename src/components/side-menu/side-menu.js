import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useWindowSize from '../../utils/useWindowSize';
import CustomLink from '../link/link';
import './side-menu.css';
import AuthInfo from '../auth-info/auth-info';
import { observer } from 'mobx-react-lite';
import sideMenuOptions from './sideMenuOptions';

// eslint-disable-next-line complexity
const SideMenu = observer(({userStore, open, onSelect}) => {
  const {width, contentWidth} = useWindowSize();
  const [items, setItems] = useState(sideMenuOptions(userStore.user));
  const location = useLocation();

  useEffect(() => {
    setItems(sideMenuOptions(userStore.user));
  }, [userStore.user]);

  const secondary = <>
    {
      width < 340 * 2 + contentWidth ? 
        <div className='item'>
          <AuthInfo user={userStore.user} onExit={handleExit} onClick={onSelect}/>
        </div> : null
    }
    {
      // eslint-disable-next-line complexity
      items.map((el, i) => {
        if (el.requireAuth && !userStore.user) {
          return null;
        }
        if (el.requireRole && !userStore.checkAccessByRole(el.requireRole)) {
          return null;
        }
        if (el.childs) {
          return (
            el.open || el.childs.some(ch => ch.path === location.pathname) ? 
              <div key={i}>
                <p 
                  id={i} 
                  key={i} 
                  onClick={onOpen} 
                  className={el.path === location.pathname ? 'item active' : 'item inactive'} 
                >{el.text}</p>
                {
                  el.childs.map((ch, y) => 
                    <CustomLink 
                      onClick={onSelect}
                      key={`${i}${y}`} 
                      id={y === 0 ? 'shadow-top' : y === el.childs.length - 1 ? 'shadow-bot' : ''}
                      className={ch.path === location.pathname ? 'child active' : 'child inactive'} 
                      to={ch.path} 
                      text={ch.text} />
                  )
                }
              </div> :
              <p id={i} key={i} onClick={onOpen} className='item inactive'>{el.text}</p>
          );
        } else {
          return <CustomLink 
            onClick={onSelect} 
            key={i} 
            className={el.path === location.pathname ? 'item active' : 'item inactive'} 
            to={el.path} 
            text={el.text} />;
        }
      })
    }
  </>;


  function handleExit() {
    userStore.exit();
    onSelect();
  }

  function onOpen(e) {
    const {id} = e.target;
    const newItems = items.map((el, i) => {
      if (i.toString() === id) {
        el.open = !el.open;
      }
      return el;
    });
    setItems(newItems);
  }
  return (
    <>
      {
        width < 340 * 2 + contentWidth && open ? 
          <div style={{zIndex: -1}} className='screen-fade' onClick={onSelect}></div> : null
      }
      <div className='side-menu'
        style={{
          width: width > 340 * 2 + contentWidth ? '340px' : 'auto'
        }}>
        <div style={{
          height: 'fit-content',
          alignSelf: 'start'
        }}>
          {
            open ? 
              secondary : null
          }
        </div>
        {
          open ? 
            <div style={{
              height: 'fit-content',
              alignSelf: 'end',
              borderTop: '1px solid var(--third-dark)'
            }}>
              <CustomLink
                className={'/terms-of-use' === location.pathname ? 'item active' : 'item inactive'}  
                onClick={onSelect} 
                to={'/terms-of-use'} 
                text='Умови використання' />
              <CustomLink
                className={'/privacy-policy' === location.pathname ? 'item active' : 'item inactive'}  
                onClick={onSelect} 
                to={'/privacy-policy'} 
                text='Політика конфіденційності' />
            </div> : null
        }
        
      </div>
    </>
  );
});

export default SideMenu;
