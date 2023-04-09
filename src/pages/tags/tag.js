import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import ArticleFeed from '../article-feed/article-feed';
import PropTypes from 'prop-types';
import Button from '../../components/button/button';
import { userClient } from '../../clients/user.client';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

const Tag = observer(({userStore, ...props}) => {
  const data = useLoaderData();
  const [tag, setTag] = useState(data);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTag(data);
  }, [data]);

  function upsertSubscription() {
    if (!userStore.user) {
      return navigate('/login');
    }
    if (userStore.user.tagSubscriptions.some(sub => sub._id === tag?._id)) {
      userClient.removeTagSubscription(tag._id)
        .then(res => {
          userStore.setUser({...userStore.user, tagSubscriptions: res.tagSubscriptions});          
          contentClient.getTagById(id)
            .then(tagData => setTag(tagData));
        });
    } else {
      userClient.addTagSubscription(tag._id)
        .then(res => {
          userStore.setUser({...userStore.user, tagSubscriptions: res.tagSubscriptions});        
          contentClient.getTagById(id)
            .then(tagData => setTag(tagData));
        });
    }
  }

  return (
    <>
      <Helmet>
        <title>Reviewton - {tag.name}</title>
      </Helmet>
      <div className='page-header'>
        <h1>{tag?.name}</h1>
        <div className='content-info'>
          <div>
            <p className='count'>Підписників: {(tag || {}).subscribers}</p>
            <p className='count'>Відгуків: {(tag || {}).articleCount}</p>
          </div>
          <div>            
            {
              (userStore?.user?.tagSubscriptions || []).some(sub => sub._id === tag?._id) ?
                <Button outlined danger text='Відписатися' onClick={upsertSubscription} /> :
                <Button outlined text='Стежити' onClick={upsertSubscription} />
            }
          </div>
        </div>
      </div>
      <ArticleFeed
        key={id} 
        user={userStore.user} receive={contentClient.getArticlesByTagId} args={[id]} />
    </>
  );
});

Tag.propTypes = {
  userStore: PropTypes.object
};

export default Tag;
