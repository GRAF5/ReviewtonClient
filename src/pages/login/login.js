import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import FormErrors from '../../components/form-errors/form-errors';
import Form from '../../components/form/form';
import InputField from '../../components/input-field/input-field';
import CustomLink from '../../components/link/link';
import { userService } from '../../services/user.service';
import useWindowSize from '../../utils/useWindowSize';

export default function Login({...props}) {
  const {width} = useWindowSize();
  const [errors, setErrors] = useState([]);

  const bodyW = width >= 576 ? 576 : width;

  function submit(inputs) {
    userService.authenticate(inputs).catch(res => {
      setErrors([res.message]);
    });
  }

  return (
  <>
      <div className={bodyW === width ? 'content' : 'bordered-content'}>
        <Form 
          title='Вхід'
          button='Увійти'
          formErrors={errors}
          onSubmit={(inputs) => {setErrors([]); submit(inputs);}}
          elements={[
            {name: 'credentials', type: 'input', label: "E-mail або і'мя користувача:", required: true},
            {name: 'password',  type: 'input', label: 'Пароль:', required: true, inputType: 'password'}
          ]}
         />
      </div>
      <div className={bodyW === width ? 'content' : 'bordered-content'}>
        <div className='centered'>
          <p>Ще не маєте акаунту? &nbsp;<CustomLink to='/register' text='Зареєструйтесь' /></p>
        </div>
      </div>
  </>)
}