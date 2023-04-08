import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './subscriptions.css';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { userClient } from '../../clients/user.client';
import { Helmet } from 'react-helmet';

const Subscriptions = observer(({userStore}) => {
  const [view, setView] = useState('user');
  const [subscriptions, setSubscriptions] = useState(userStore.user.userSubscriptions);
  const navigate = useNavigate();

  function changeView(e, newView) {
    if (!e.key || e.key === 'Enter') {
      setView(newView);
      setSubscriptions(userStore.user[`${newView}Subscriptions`]);
    }
  }
  function removeSubscription(id) {
    switch (view) {
    case 'user': 
      userClient.removeUserSubscription(id)
        .then(res => {
          userStore.setUser({...userStore.user, userSubscriptions: res.userSubscriptions});
          setSubscriptions(userStore.user[`${view}Subscriptions`]);
        });
      break;
    case 'subject': 
      userClient.removeSubjectSubscription(id)
        .then(res => {
          userStore.setUser({...userStore.user, subjectSubscriptions: res.subjectSubscriptions});
          setSubscriptions(userStore.user[`${view}Subscriptions`]);
        });
      break;
    case 'tag':
      userClient.removeTagSubscription(id)
        .then(res => {
          userStore.setUser({...userStore.user, tagSubscriptions: res.tagSubscriptions});
          setSubscriptions(userStore.user[`${view}Subscriptions`]);
        });
      break;
    }
  }
  function navigateTo(e, id) {
    if (!e.key || e.key === 'Enter') {
      return navigate(`/${view}s/${id}`);
    }
  }
  return (
    <>      
      <Helmet>
        <title>Reviewton - {userStore.user.login} Підписки</title>
      </Helmet>
      <div className='page-header'>
        <h1>Ваші підписки</h1>
      </div>
      <div className='menu-bar'>
        <p 
          tabIndex={0} 
          onClick={e => changeView(e, 'user')}
          onKeyDown={e => changeView(e, 'user')}
          className={view === 'user' ? 'selected' : ''}>Користувачі {userStore.user.userSubscriptions.length}</p>
        <p 
          tabIndex={0} 
          onClick={e => changeView(e, 'subject')}
          onKeyDown={e => changeView(e, 'subject')}
          className={view === 'subject' ? 'selected' : ''}>Теми {userStore.user.subjectSubscriptions.length}</p>
        <p 
          tabIndex={0} 
          onClick={e => changeView(e, 'tag')}
          onKeyDown={e => changeView(e, 'tag')}
          className={view === 'tag' ? 'selected' : ''}>Теги {userStore.user.tagSubscriptions.length}</p>
      </div>
      {
        subscriptions.map(sub => <div className='subscription' key={sub._id}>
          <p 
            tabIndex={0} 
            onClick={e => navigateTo(e, sub._id)} 
            onKeyDown={e => navigateTo(e, sub._id)}>{sub.name || sub.login}</p>
          <div>
            <Button outlined danger text='Відпісатись' onClick={() => removeSubscription(sub._id)} />
          </div>
        </div>)
      }
    </>
  );
});

Subscriptions.propTypes = {
  userStore: PropTypes.object
};

export default Subscriptions;

