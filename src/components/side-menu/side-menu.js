import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useWindowSize from '../../utils/useWindowSize';
import CustomLink from '../link/link';
import './side-menu.css';
import iconMenuWhite from '../../icons/menu_white_24dp.svg';
import closeMenu from '../../icons/icons8-close.svg';
import AuthInfo from '../auth-info/auth-info';
import { observer } from 'mobx-react-lite';
import logo from '../../icons/logo.png';

const SideMenu = observer(({userStore}) => {
  const {width} = useWindowSize();
  const [items, setItems] = useState([
    {text: 'Нові відгуки', path: '/'},
    {text: 'Додати відгук', path: '/add-article'},
    // {text: 'Підписки', path: '/account//subscriptions', requireAuth: true},
    {text: 'Акаунт', path: `/account/${userStore?.user?.id}`, requireAuth: true},
    // {text: 'Повідомлення', path: '/account//add-article', requireAuth: true},
    // {text: 'Мої статті', path: '/account//articles', requireAuth: true},
    {text: 'Теми', path: '/subjects'},
    {text: 'Теги', path: '/tags'}
    // {text: 'Модерація ⇵', open: false, childs: [
    //   {text: 'Користувачі', path: '/moderate/users'},
    //   {text: 'Статті', path: '/moderate/articles'},
    //   {text: 'Коментарі', path: '/moderate/comments'}
    // ], requireAuth: true, requireRole: 'moderator'},
    // {text: 'Адміністрування ⇵', open: false, childs: [
    //   {text: 'Користувачі', path: '/administrate/users'},
    //   {text: 'Теми', path: '/administrate/subjects'},
    //   {text: 'Теги', path: '/administrate/tags'}
    // ], requireAuth: true, requireRole: 'admin'}
  ]);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setItems([
      {text: 'Нові відгуки', path: '/'},
      {text: 'Додати відгук', path: '/add-article'},
      // {text: 'Підписки', path: '/account//subscriptions', requireAuth: true},
      {text: 'Акаунт', path: `/users/${userStore?.user?.id}`, requireAuth: true},
      // {text: 'Повідомлення', path: '/account//add-article', requireAuth: true},
      // {text: 'Мої статті', path: '/account//articles', requireAuth: true},
      {text: 'Теми', path: '/subjects'},
      {text: 'Теги', path: '/tags'},
      {text: 'Модерація ⇵', open: false, childs: [
        {text: 'Користувачі', path: '/moderate/users'},
        {text: 'Статті', path: '/moderate/articles'},
        {text: 'Коментарі', path: '/moderate/comments'}
      ], requireAuth: true, requireRole: 'moderator'},
      {text: 'Адміністрування ⇵', open: false, childs: [
        {text: 'Користувачі', path: '/administrate/users'},
        {text: 'Теми', path: '/administrate/subjects'},
        {text: 'Теги', path: '/administrate/tags'}
      ], requireAuth: true, requireRole: 'admin'}
    ]);
  }, [userStore.user]);

  const secondary =   <div className='secondary'>
    {
      width < 345 * 2 + (+process.env.REACT_APP_CONTENT_WIDTH) ? 
        <div className='item'>
          <AuthInfo user={userStore.user} onExit={handleExit} onClick={onMenu}/>
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
                      onClick={onMenu}
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
            onClick={onMenu} 
            key={i} 
            className={el.path === location.pathname ? 'item active' : 'item inactive'} 
            to={el.path} 
            text={el.text} />;
        }
      })
    }
  </div>;


  function handleExit() {
    userStore.exit();
    onMenu();
  }

  function onMenu(e = {}, value = !menu) {
    if (!e.key || e.key === 'Enter') {
      const newItems = items.map(el => {
        if (el.open) {
          el.open = false;
        }
        return el;
      });
      setItems(newItems);
      setMenu(value);
    }
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
  function onMain(e) {
    if (!e.key || e.key === 'Enter') {
      navigate('/', {replace: true});
    }
  }
  return (
    <div className='body-left-side'>
      <div style={width >= 1276 ? {
        'width': '340px',
        'height': '100%',
        'overflow': 'auto',
        'display': 'grid'
      } : {
        'height': '100%',
        'overflow': 'auto',
        'display': 'grid'}}>
        {
          width >= 345 * 2 + (+process.env.REACT_APP_CONTENT_WIDTH) ? 
            <>
              <img alt='Main' tabIndex={0} style={{
                width: '130px',
                height: 'auto',
                padding: '24px 40px',
                cursor: 'pointer'
              }} className='item head' src={logo} onClick={onMain} onKeyDown={onMain} />
              {secondary}
            </> :
            <>
              <div className='item head'>
                <img 
                  tabIndex={0} 
                  className='menu' 
                  onKeyDown={onMenu} 
                  onClick={onMenu} 
                  src={!menu ? iconMenuWhite : closeMenu} 
                  alt='menu' /> 
                <img alt='Main' tabIndex={0}
                  style={{
                    width: '130px',
                    height: 'auto',
                    zIndex: '-1',
                    cursor: 'pointer'
                  }} src={logo} onClick={onMain} onKeyDown={onMain} />
              </div>
              {menu ? 
                <>
                  <div className='screen-fade' onClick={onMenu}></div>
                  {secondary}
                </> : null}
            </>
        }
      </div>
    </div>
  );
});

export default SideMenu;
