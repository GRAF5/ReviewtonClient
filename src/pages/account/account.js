import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import { userClient } from '../../clients/user.client';
import ArticleFeed from '../article-feed/article-feed';
import PropTypes from 'prop-types';

export default function Account({user, ...props}) {
  const [account, setAccount] = useState();
  const {id} = useParams();

  useEffect(() => {
    userClient.getUserById(id)
      .then(res => setAccount(res));
  }, []);


  return (
    <>
      <ArticleFeed user={user} pageName={account?.login} receive={contentClient.getArticlesByUserId.bind(this, id)} />
    </>
  );
}

Account.propTypes = {
  user: PropTypes.object
};
