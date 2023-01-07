import { Route, Routes } from 'react-router';
import './App.css';
import Login from './pages/login/login';
import Main from './pages/main/main';
import Register from './pages/register/register';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
