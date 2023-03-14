import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/form/form';
import CustomLink from '../../components/link/link';
import { userClient } from '../../clients/user.client';
import useWindowSize from '../../utils/useWindowSize';
import config from '../../config';

const Login = observer(({userStore}) => {
  const {width, contentWidth} = useWindowSize();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function submit(inputs) {
    userClient.authenticate(inputs)
    .then(res => {
      userStore.setUser(res);
      return navigate('/', {replace: true});
    })
    .catch(res => {
      setErrors([res.message]);
    });
  }

  return (
  <>
      <div className={contentWidth === width ? 'content' : 'bordered-content'}>
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
      <div className={contentWidth === width ? 'content' : 'bordered-content'}>
        <div className='centered'>
          <p>Ще не маєте акаунту? &nbsp;<CustomLink replace to='/register' text='Зареєструйтесь' /></p>
        </div>
      </div>
  </>)
});

export default Login;