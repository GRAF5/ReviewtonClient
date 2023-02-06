import React, { useState } from 'react';
import CustomLink from '../../components/link/link';
import useWindowSize from '../../utils/useWindowSize';
import { userService } from '../../services/user.service';
import Form from '../../components/form/form';
import { useNavigate } from 'react-router-dom';

export default function Register({...props}) {
  const {width} = useWindowSize();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const bodyW = width >= 576 ? 576 : width;

  function submit(inputs) {
    userService.register(inputs)
    .then(() => {
      return navigate('/login');
    })
    .catch(res => {
      let errors = res.details.errors.map(err => err.msg);
      setErrors(errors);
    });
  }

  return (
  <>
      <div className={bodyW === width ? 'content' : 'bordered-content'}>
        <Form
          title='Реєстрація'
          button='Зареэструватись'
          formErrors={errors}
          onSubmit={(inputs) => {setErrors([]); submit(inputs);}}
          elements={[
            {
              name: 'email', type: 'input', label: 'E-mail:', required: true, 
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              placeholder: 'test@test.com'
            },
            {
              name: 'login', type: 'input', minLength: 4, maxLength: 20, label: "І'мя користувача:", 
              helperText: 'Від 4 до 20 символів', required: true
            },
            {
              name: 'password', type: 'input',  minLength: 8, label: 'Пароль:', inputType: 'password',
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/, required: true,
              helperText: 'Пароль повинен містити мінімум 8 символів, включати латинські літери верхнього та нижнього регістру, а також цифр'
            },
            {
              name: 'passwordRepeat', type: 'input', label: 'Підтвердіть пароль:', inputType: 'password',
              helperText: 'Необхідно підтвердити пароль', required: true, equal: {input: 'password'}
            }
          ]}
        />
      </div>
      <div className={bodyW === width ? 'content' : 'bordered-content'}>
        <div className='centered'>
          <p>Вже зареэстровані? &nbsp;<CustomLink replace to='/login' text='Увійдіть' /></p>
        </div>
      </div>
  </>)
}