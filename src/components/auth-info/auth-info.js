import React from 'react';
import Button from '../button/button';
import CustomLink from '../link/link';

export default function AuthInfo({ user, onExit, onClick, ...props}) {
  return (
    <div style={{'display': 'flex', 'alignItems': 'center', 'width': '100%'}}>
      {
        user ? 
          <>
            <Button text={'Вийти'} contained onClick={onExit} />
          </> :          
          <>
            <CustomLink outlined to='/login' text='Увійти' onClick={onClick} />
            &nbsp;
            <CustomLink contained to='/register' text='Реєстрація' onClick={onClick} />
          </>
      }
    </div>
  )
}