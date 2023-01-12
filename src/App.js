import { Route, Routes } from 'react-router';
import './App.css';
import SideMenu from './components/side-menu/side-menu';
import Login from './pages/login/login';
import Main from './pages/main/main';
import Register from './pages/register/register';
import useWindowSize from './utils/useWindowSize';

function App() {
  const {width} = useWindowSize();
  const R = <Routes>
    <Route path='/' element={<Main/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
  return (
    <div className='App'>
      <div className='Body'>
        {
          width >= 1276 ?
          <>
            <div className='body-left-side'>
              <SideMenu />
            </div>
            <div className='body-right-side'>
              {R}
            </div>
          </>
          :
          <>
            <div className='body-left-side'>
              <SideMenu />
            </div>
            <div className='body-right-side-adaptive'>
              {R}
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
