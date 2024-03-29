import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import { userClient } from '../../clients/user.client';
import ArticleFeed from '../article-feed/article-feed';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import Button from '../../components/button/button';
import { Helmet } from 'react-helmet';

const Account = observer(({userStore, socketStore, ...props}) => {
  const data = useLoaderData();
  const [account, setAccount] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setAccount(data);
  }, [data]);


  function upsertSubscription() {
    if (!userStore.user) {
      return navigate('/login');
    }
    if (userStore.user.userSubscriptions.some(sub => sub._id === account._id)) {
      userClient.removeUserSubscription(account._id)
        .then(res => {
          userStore.setUser({...userStore.user, userSubscriptions: res.userSubscriptions});
          userClient.getUserById(account._id)
            .then(accountData => setAccount(accountData));
        });
    } else {
      userClient.addUserSubscription(account._id)
        .then(res => {
          userStore.setUser({...userStore.user, userSubscriptions: res.userSubscriptions});
          userClient.getUserById(account._id)
            .then(accountData => setAccount(accountData));
        });
    }
  }

  function navigateToSubscriptions(e) {
    if (!e.key || e.key === 'Enter') {
      return navigate('/account/subscriptions');
    }
  }

  return (
    <>
      <Helmet>
        <title>Reviewton - {account.login}</title>
      </Helmet>
      <div className='page-header'>
        <h1>{account?.login}</h1>
        <div className='content-info'>
          <div>
            <p className='count'>Підписників: {account?.subscribers}</p>
            <p className='count'>Відгуків: {account?.articleCount}</p>
          </div>
          <div>            
            {
              userStore?.user?.id !== account._id ?
                (userStore?.user?.userSubscriptions || []).some(sub => sub._id === account._id) ?
                  <Button outlined danger text='Відписатися' onClick={upsertSubscription} /> :
                  <Button outlined text='Стежити' onClick={upsertSubscription} /> : 
                <p 
                  tabIndex={0} 
                  className='subscriptions'
                  onClick={navigateToSubscriptions}
                  onKeyDown={navigateToSubscriptions}>Підписки: {
                    userStore?.user?.tagSubscriptions?.length + 
                    userStore?.user?.subjectSubscriptions?.length + 
                    userStore?.user?.userSubscriptions?.length}</p>
            }
          </div>
        </div>
      </div>
      <ArticleFeed 
        key={account._id} 
        socketStore={socketStore}
        userStore={userStore} receive={contentClient.getArticlesByUserId} args={[account._id]}  />
    </>
  );
});

Account.propTypes = {
  user: PropTypes.object
};

export default Account;
