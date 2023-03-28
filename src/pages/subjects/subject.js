import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import ArticleFeed from '../article-feed/article-feed';
import PropTypes from 'prop-types';

export default function Subject({user, ...props}) {
  const [subject, setSubject] = useState();
  const {id} = useParams();

  useEffect(() => {
    contentClient.getSubjectById(id)
      .then(res => setSubject(res));
  }, []);


  return (
    <>
      <ArticleFeed user={user} pageName={subject?.name} receive={contentClient.getArticlesBySubjectId.bind(this, id)} />
    </>
  );
}

Subject.propTypes = {
  user: PropTypes.object
};
