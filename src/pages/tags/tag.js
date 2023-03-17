import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import ArticleFeed from '../article-feed/article-feed';

export default function Tag({user, ...props}) {
  const [tag, setTag] = useState();
  const {id} = useParams();

  useEffect(() => {
    contentClient.getTagById(id)
      .then(res => setTag(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return(
    <>
      <ArticleFeed user={user} pageName={tag?.name} receive={contentClient.getArticlesByTagId.bind(this, id)} />
    </>
  )
}