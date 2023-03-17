import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import { userClient } from '../../clients/user.client';
import ArticleFeed from '../article-feed/article-feed';

export default function Account({user, ...props}) {
  const [account, setAccount] = useState();
  const {id} = useParams();

  useEffect(() => {
    userClient.getUserById(id)
      .then(res => setAccount(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return(
    <>
      <ArticleFeed user={user} pageName={account?.login} receive={contentClient.getArticlesByUserId.bind(this, id)} />
    </>
  )
}