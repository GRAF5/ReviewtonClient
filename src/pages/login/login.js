import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/form/form';
import CustomLink from '../../components/link/link';
import { userService } from '../../services/user.service';
import useWindowSize from '../../utils/useWindowSize';

const Login = observer(({userStore}) => {
  const {width} = useWindowSize();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const bodyW = width >= 576 ? 576 : width;

  function submit(inputs) {
    userService.authenticate(inputs)
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
          <p>Ще не маєте акаунту? &nbsp;<CustomLink replace to='/register' text='Зареєструйтесь' /></p>
        </div>
      </div>
  </>)
});

export default Login;