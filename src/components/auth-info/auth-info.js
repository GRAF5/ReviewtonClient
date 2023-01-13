import React from 'react';
import CustomLink from '../link/link';

export default function AuthInfo({ onClick, ...props}) {
  return (
    <div>
      <CustomLink outlined to='/login' text='Увійти' onClick={onClick} />
      &nbsp;
      <CustomLink contained to='/register' text='Реєстрація' onClick={onClick}/>
    </div>
  )
}