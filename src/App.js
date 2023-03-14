import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/header/header';
import SideMenu from './components/side-menu/side-menu';
import Login from './pages/login/login';
import Main from './pages/main/main';
import Register from './pages/register/register';
import { userClient } from './clients/user.client';
import useWindowSize from './utils/useWindowSize';
import { Helmet } from 'react-helmet';

const App = observer(({userStore}) => {
  
  const {width, contentWidth} = useWindowSize();

  const R = <Routes>
    <Route path='/' element={<Main user={userStore.user}/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login userStore={userStore}/>} />
  </Routes>;

  useEffect(() => {
    userClient.current()
      .then(res => {
        userStore.setUser(res);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='App'>
      <Helmet>                
        {/* !-- HTML Meta Tags --> */}
        <title>Reviewton</title>
        <meta name='description' content='Веб-додаток для створення відгуків чи повноцінних обзорів на будь-які товари чи послуги'/>

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemprop='name' content='Reviewton'/>
        <meta itemprop='description' content='Веб-додаток для створення відгуків чи повноцінних обзорів на будь-які товари чи послуги'/>
        <meta itemprop='image' content=''/>

        {/* <!-- Facebook Meta Tags --> */}
        <meta property='og:url' content='https://reviewton-li40.onrender.com'/>
        <meta property='og:type' content='website'/>
        <meta property='og:title' content='Reviewton'/>
        <meta property='og:description' content='Веб-додаток для створення відгуків чи повноцінних обзорів на будь-які товари чи послуги'/>
        <meta property='og:image' content=''/>

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image'/>
        <meta name='twitter:title' content='Reviewton'/>
        <meta name='twitter:description' content='Веб-додаток для створення відгуків чи повноцінних обзорів на будь-які товари чи послуги'/>
        <meta name='twitter:image' content=''/>
      </Helmet>
      <div className='Body'>
        <Header userStore={userStore} />
        <div className='body-left-side'>
          <div style={width >= 1276 ?{
            'width': '340px',
            'height': '100%',
            'overflow': 'auto',
            'position': 'fixed',
            'display': 'grid'
          }:{
            'height': '100%',
            'overflow': 'auto',
            'position': 'fixed',
            'display': 'grid'}}>
            <SideMenu userStore={userStore}/>
          </div>
        </div>
        <div className={width >= 1276 ? 'body-right-side' : 'body-right-side-adaptive'}>
          <div className='content-wrapper' 
            style={{
            'marginLeft': width >= 1276 ? `${(width - contentWidth) / 2 - 340}px` : `${(width - contentWidth) / 2}px`,
            'width': `${contentWidth - 40}px`}}>
            {R}
          </div>
        </div>
      </div>
    </div>
  );
})

export default App;
