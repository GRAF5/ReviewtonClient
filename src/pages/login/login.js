import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/form/form';
import CustomLink from '../../components/link/link';
import { userClient } from '../../clients/user.client';
import useWindowSize from '../../utils/useWindowSize';
import { Helmet } from 'react-helmet';

const Login = observer(({userStore}) => {
  const {width, contentWidth} = useWindowSize();
  const [errors, setErrors] = useState([]);
  const [loadProcessing, setLoadProcessing] = useState(false);
  const navigate = useNavigate();

  function submit(inputs) {
    setLoadProcessing(true);
    userClient.authenticate(inputs)
      .then(res => {
        userStore.setUser(res);
        return navigate(-1, {replace: true});
      })
      .catch(res => {
        setErrors([res.message]);
      })
      .finally(() => {
        setLoadProcessing(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Reviewton - Вхід</title>
      </Helmet>
      <div className={contentWidth === width ? 'content' : 'bordered-content'}>
        <Form 
          title='Вхід'
          button='Увійти'
          formErrors={errors}
          onSubmit={(inputs) => {setErrors([]); submit(inputs);}}
          elements={[
            {name: 'credentials', type: 'input', label: 'E-mail або і\'мя користувача:', required: true},
            {name: 'password',  type: 'input', label: 'Пароль:', required: true, inputType: 'password'}
          ]}
        />
      </div>
      <div className={contentWidth === width ? 'content' : 'bordered-content'}>
        <div className='centered'>
          <p>Ще не маєте акаунту? &nbsp;<CustomLink replace to='/register' text='Зареєструйтесь' /></p>
        </div>
      </div>
      {
        loadProcessing ? 
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} className='screen-fade'>
            <svg 
              className='loading-icon white' 
              viewBox="0 0 1024 1024" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                // eslint-disable-next-line max-len
                d="M512.056 908.647c-84.516 0-166.416-27.084-235.266-78.637-84.15-63.028-138.741-155.109-153.675-259.2-14.934-104.119 11.559-207.816 74.588-291.994 130.162-173.812 377.438-209.25 551.194-79.172 72.844 54.562 124.819 133.228 146.391 221.484 3.684 15.103-5.569 30.319-20.644 34.003-15.075 3.572-30.319-5.541-34.003-20.644-18.45-75.628-63-143.044-125.466-189.816-148.866-111.516-360.844-81.112-472.444 67.866-54.028 72.141-76.725 161.016-63.9 250.256 12.797 89.241 59.597 168.131 131.737 222.131 149.006 111.656 360.956 81.197 472.5-67.781 29.194-39.009 49.219-82.716 59.456-129.938 3.319-15.188 18.366-24.834 33.441-21.544 15.188 3.291 24.834 18.281 21.544 33.441-12.009 55.181-35.353 106.2-69.413 151.762-63.028 84.15-155.109 138.769-259.256 153.675-18.984 2.756-37.941 4.106-56.784 4.106z"/>
            </svg>
          </div> : null
      }
    </>);
});

export default Login;
