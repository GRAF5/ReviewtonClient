import React, { useState } from 'react';
import { useLocation } from 'react-router';
import useWindowSize from '../../utils/useWindowSize';
import CustomLink from '../link/link';
import './side-menu.css'
import iconMenuWhite from '../../icons/menu_white_24dp.svg'
import closeMenu from '../../icons/icons8-close.svg'
import AuthInfo from '../auth-info/auth-info';

export default function SideMenu({...props}) {
  const {width} = useWindowSize();
  const [items, setItems] = useState([
    {text: 'Нові', path: '/'},
    {text: 'Додати статтю', path: '/add-article'},
    {text: 'Підписки', path: '/account//subscriptions'},
    {text: 'Акаунт', path: '/account'},
    {text: 'Повідомлення', path: '/account//add-article'},
    {text: 'Мої статті', path: '/account//articles'},
    {text: 'Теми', path: '/subjects'},
    {text: 'Теги', path: '/tags'},
    {text: 'Модерація ⇵', open: false, childs: [
      {text: 'Користувачі', path: '/moderate/users'},
      {text: 'Статті', path: '/moderate/articles'},
      {text: 'Коментарі', path: '/moderate/comments'}
    ]},
    {text: 'Адміністрування ⇵', open: false, childs: [
      {text: 'Користувачі', path: '/administrate/users'},
      {text: 'Теми', path: '/administrate/subjects'},
      {text: 'Теги', path: '/administrate/tags'}
    ]}
  ]);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const secondary =   <div className='secondary'>
    {
      width < 1276 ? 
      <div className='item'>
        <AuthInfo onClick={onMenu}/>
      </div>
      : null
    }
    {
        items.map((el, i) => {
          if (el.childs) {
            return (
              el.open || el.childs.some(ch => ch.path === location.pathname) ? 
              <div key={i}>
                <CustomLink id={i} key={i} onClick={onOpen} className='item active' text={el.text} />
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
              </div>
              :
              <CustomLink id={i} key={i} onClick={onOpen} className='item inactive' text={el.text} />
            )
          } else {
            return <CustomLink onClick={onMenu} key={i} className={el.path === location.pathname ? 'item active' : 'item inactive'} to={el.path} text={el.text} />
          }
        })
    }
  </div>

  function onMenu(e) {
    const newItems = items.map(el => {
      if (el.open) {
        el.open = false;
      }
      return el;
    });
    setItems(newItems);
    setMenu(!menu);
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
        width >= 1276 ? 
        <>
        <CustomLink onClick={onMenu} key='head' className='item head' to='/' text='Reviewton'/>
        {secondary}
        </>
        :
        <>
        <div className='item head'>
          <img className='menu' onClick={onMenu} src={!menu ? iconMenuWhite : closeMenu} alt='menu' /> 
          <CustomLink onClick={onMenu} key='head' to='/' text='Reviewton'/>
        </div>
        {menu ? 
          <>
            <div className='screen-fade' onClick={onMenu}></div>
            {secondary}
          </>
        : null}
        </>
      }
    </>
  )
}