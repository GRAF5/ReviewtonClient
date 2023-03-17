import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import ArticleFeed from '../article-feed/article-feed';

export default function Subject({user, ...props}) {
  const [subject, setSubject] = useState();
  const {id} = useParams();

  useEffect(() => {
    contentClient.getSubjectById(id)
      .then(res => setSubject(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return(
    <>
      <ArticleFeed user={user} pageName={subject?.name} receive={contentClient.getArticlesBySubjectId.bind(this, id)} />
    </>
  )
}