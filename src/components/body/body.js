import React, { useEffect } from 'react';
import useWindowSize from '../../utils/useWindowSize';
import Header from '../header/header';
import SideMenu from '../side-menu/side-menu';
import PropTypes from 'prop-types';
import { Outlet, useLocation } from 'react-router-dom';

const Body = (({userStore, children}) => {
  const {width, contentWidth} = useWindowSize();
  const location = useLocation();

  useEffect(() => {
    history.replaceState({}, '', location.pathname);
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  return (
    <div className='Body'>
      <Header userStore={userStore} />
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
          <SideMenu userStore={userStore}/>
        </div>
      </div>
      <div className={width >= 1276 ? 'body-right-side' : 'body-right-side-adaptive'}>
        <div className='content-wrapper' 
          style={{
            'marginLeft': width >= 1276 ? `${(width - contentWidth) / 2 - 340}px` : `${(width - contentWidth) / 2}px`,
            'width': `${contentWidth - 40}px`}}>
          <Outlet user={userStore.user} context={{user: userStore.user, userStore: userStore}} />
          {/* {children} */}
          {/* <ScrollRestoration 
            getKey={(loc, matches) => {
            // default behavior
              console.log(history);
              return loc.key;
            }}
          /> */}
        </div>
      </div>
    </div>
  );
});

Body.propTypes = {
  userStore: PropTypes.object,
  children: PropTypes.element
};

export default Body;
