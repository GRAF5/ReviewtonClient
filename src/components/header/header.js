import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { contentClient } from '../../clients/content.client';
import useWindowSize from '../../utils/useWindowSize';
import AuthInfo from '../auth-info/auth-info';
import Autocomplete from '../autocomplete/autocomplete';
import './header.css';
import logo from '../../icons/logo.png';
import iconMenuWhite from '../../icons/menu_white_24dp.svg';
import closeMenu from '../../icons/icons8-close.svg';
import SideMenu from '../side-menu/side-menu';
import CustomLink from '../link/link';

// eslint-disable-next-line complexity
const Header = observer(({userStore}) => {
  const {width, contentWidth} = useWindowSize();
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFindShow, setIsFindShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState(false);

  function handleExit() {
    userStore.exit();
  }
  function handleFindChange(name, value) {
    if (value.length) {
      contentClient.getFilters(value)
        .then(res => {
          let filtersR = res.filters.filter(f => !filters.some(fil => fil === f));
          if (filtersR.length) {
            setFilters(filters.concat(filtersR));
          }
        });
    }
    setFilter(value);
  }
  function onFind() {
    setIsFindShow(false);
    navigate(`/?filter=${filter}`);
  }
  function showFind(e) {
    if (!e.key || e.key === 'Enter') {
      setIsFindShow(!isFindShow);
    }
  }
  const findComp = <div style={{padding: '0 20px', width:'100%'}}><Autocomplete 
    name='find'
    placeholder='Пошук'
    onChange={handleFindChange}
    options={filters}   
    button={{
      childs: 
        <svg 
          style={{width: '25px', height: '25px'}} 
          viewBox="0 0 1024 1024" 
          version="1.1" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="currentColor" 
            // eslint-disable-next-line max-len
            d="M947.942255 886.008182 720.970894 659.243529c48.977481-62.368466 78.178547-140.907217 78.178547-226.249931 0-202.907293-165.033707-367.395578-368.613312-367.395578-203.580628 0-368.616382 164.489308-368.616382 367.395578 0 202.90627 165.035754 367.395578 368.616382 367.395578 85.758176 0 164.673503-29.192879 227.295749-78.146824l226.938616 226.728838c12.769838 12.727882 33.475416 12.727882 46.246277 0l16.925485-16.870226C960.713117 919.374104 960.713117 898.736065 947.942255 886.008182zM430.536129 711.482287c-154.315598 0-279.414781-124.682697-279.414781-278.487665 0-153.805992 125.099183-278.488689 279.414781-278.488689 154.315598 0 279.410688 124.68372 279.410688 278.488689C709.946816 586.79959 584.851727 711.482287 430.536129 711.482287z"/>
        </svg>,
      reset: true,
      onClick: onFind
    }}  
  /></div>;

  function onMain(e) {
    if (!e.key || e.key === 'Enter') {
      setMenu(false);
      navigate('/', {replace: true});
    }
  }
  function onMenu(e = {}, value = !menu) {
    if (!e.key || e.key === 'Enter') {
      setMenu(value);
    }
  }
  return (
    <div style={{
      zIndex: isFindShow ? 5000 : 1000
    }} className='header'>
      {
        isFindShow ?
          <div 
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--main-dark)',
              paddingRight: '40px',
              zIndex: 1
            }}>
            <svg
              onClick={showFind}
              onKeyDown={showFind}
              style={{ marginLeft: '40px', width: '25px', height: '25px', color: 'white', cursor: 'pointer'}}  
              viewBox="0 0 1024 1024" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                // eslint-disable-next-line max-len
                d="M955.076923 433.230769H301.292308c-17.723077 0-25.6-21.661538-13.784616-33.476923l189.046154-189.046154c11.815385-11.815385 11.815385-29.538462 0-41.353846L433.230769 126.030769c-11.815385-11.815385-29.538462-11.815385-41.353846 0L47.261538 470.646154c-11.815385 11.815385-11.815385 29.538462 0 41.353846l344.615385 344.615385c11.815385 11.815385 29.538462 11.815385 41.353846 0l41.353846-41.353847c11.815385-11.815385 11.815385-29.538462 0-41.353846l-189.046153-189.046154c-11.815385-11.815385-3.938462-33.476923 13.784615-33.476923h653.784615c15.753846 0 29.538462-13.784615 29.538462-29.538461v-59.076923c1.969231-15.753846-11.815385-29.538462-27.569231-29.538462z"/>
            </svg>
            {findComp}
          </div> :
          <>
            {
              width >= 340 * 2 + contentWidth ? 
                <div className='head-content left'
                  style={{
                    width: '340px'
                  }}>
                  <CustomLink to='/'>
                    <img alt='Reviewton' tabIndex={0} style={{
                      width: '130px',
                      height: 'auto',
                      cursor: 'pointer'
                    }} src={logo} onClick={onMain} onKeyDown={onMain} />
                  </CustomLink>
                  <SideMenu onSelect={() => setMenu(false)} open={true} userStore={userStore} />
                </div> : 
                <div className='head-content left'>
                  <img 
                    tabIndex={0} 
                    className='menu' 
                    onKeyDown={onMenu} 
                    onClick={onMenu} 
                    src={!menu ? iconMenuWhite : closeMenu} 
                    alt='menu' /> 
                  <CustomLink to='/'>
                    <img alt='Reviewton' tabIndex={0}
                      style={{
                        width: '130px',
                        height: 'auto',
                        cursor: 'pointer'
                      }} src={logo} onClick={onMain} onKeyDown={onMain} />
                  </CustomLink>
                  <SideMenu onSelect={() => setMenu(false)} open={menu} userStore={userStore} />
                </div>
            } 
            <div className='center' style={{
              // 'marginLeft': `${width >= 340 * 2 + contentWidth ? (width - contentWidth) / 2 : 0}px`,
              'width': width >= 340 * 2 + contentWidth ? `${contentWidth}px` : '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center'}}>
              { 
                location.pathname !== '/login' && location.pathname !== '/register' ?
                  width >= 340 * 2 + contentWidth ? findComp : null : null
              }
            </div>
            {
              width >= 340 * 2 + contentWidth ? 
                <div className='head-content right'
                  style={{
                    width: width >= 340 * 2 + contentWidth ? '340px' : '0px'
                  }}>
                  <div className='right'>
                    <AuthInfo user={userStore.user} onExit={handleExit} />
                  </div>   
                </div> : !isFindShow ? 
                  <div
                    style={{display: 'flex', justifyContent:'end', paddingRight: '40px', width: '100%'}}>
                    <svg 
                      tabIndex={0} 
                      style={{ zIndex: 1, width: '25px', height: '25px', color: 'white', cursor: 'pointer'}}
                      onClick={showFind}
                      onKeyDown={showFind} 
                      viewBox="0 0 1024 1024" 
                      version="1.1" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        fill="currentColor" 
                        // eslint-disable-next-line max-len
                        d="M947.942255 886.008182 720.970894 659.243529c48.977481-62.368466 78.178547-140.907217 78.178547-226.249931 0-202.907293-165.033707-367.395578-368.613312-367.395578-203.580628 0-368.616382 164.489308-368.616382 367.395578 0 202.90627 165.035754 367.395578 368.616382 367.395578 85.758176 0 164.673503-29.192879 227.295749-78.146824l226.938616 226.728838c12.769838 12.727882 33.475416 12.727882 46.246277 0l16.925485-16.870226C960.713117 919.374104 960.713117 898.736065 947.942255 886.008182zM430.536129 711.482287c-154.315598 0-279.414781-124.682697-279.414781-278.487665 0-153.805992 125.099183-278.488689 279.414781-278.488689 154.315598 0 279.410688 124.68372 279.410688 278.488689C709.946816 586.79959 584.851727 711.482287 430.536129 711.482287z"/>
                    </svg>
                  </div> : null
            } 
          </>
      }        
    </div>
  );
});

export default Header;
