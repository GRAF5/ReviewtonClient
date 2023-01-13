import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/header/header';
import SideMenu from './components/side-menu/side-menu';
import Login from './pages/login/login';
import Main from './pages/main/main';
import Register from './pages/register/register';
import useWindowSize from './utils/useWindowSize';

function App() {
  const {width} = useWindowSize();
  const bodyW = width >= 576 ? 576 : width;
  const R = <Routes>
    <Route path='/' element={<Main/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
  return (
    <div className='App'>
      <div className='Body'>
        <Header />
        <div className='body-left-side'>
          <SideMenu />
        </div>
        <div className={width >= 1276 ? 'body-right-side' : 'body-right-side-adaptive'}>
          {width}
          <div className='content-wrapper' style={{
            'marginLeft': width >= 1276 ? `${(width - bodyW) / 2 - 340}px` : `${(width - bodyW) / 2}px`,
            'width': `${bodyW}px`}}>
            {R}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
