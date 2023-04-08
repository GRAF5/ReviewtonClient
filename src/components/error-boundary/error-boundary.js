import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouteError } from 'react-router';
import Header from '../header/header';

const ErrorBoundary = observer(({userStore, ...props}) => {
  const error = useRouteError();
  return (
    <div className='error-element'>
      <Header userStore={userStore} />
      <div>
        <h1 className='status'>{error.status}</h1>
        <p>{error.statusText || error.message}</p>
      </div>
    </div>
  );
});

export default ErrorBoundary;
