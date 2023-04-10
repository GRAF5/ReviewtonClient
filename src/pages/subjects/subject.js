import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { contentClient } from '../../clients/content.client';
import ArticleFeed from '../article-feed/article-feed';
import PropTypes from 'prop-types';
import StarRating from '../../components/star-rating/star-rating';
import { observer } from 'mobx-react-lite';
import { userClient } from '../../clients/user.client';
import Button from '../../components/button/button';
import { Helmet } from 'react-helmet';

const Subject = observer(({userStore, socketStore, ...props}) => {
  const data = useLoaderData();
  const [subject, setSubject] = useState(data);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSubject(data);
  }, [data]);

  function upsertSubscription() {
    if (!userStore.user) {
      return navigate('/login');
    }
    if (userStore.user.subjectSubscriptions.some(sub => sub._id === subject?._id)) {
      userClient.removeSubjectSubscription(subject._id)
        .then(res => {
          userStore.setUser({...userStore.user, subjectSubscriptions: res.subjectSubscriptions});
          contentClient.getSubjectById(id)
            .then(subjectData => setSubject(subjectData));
        });
    } else {
      userClient.addSubjectSubscription(subject._id)
        .then(res => {
          userStore.setUser({...userStore.user, subjectSubscriptions: res.subjectSubscriptions});
          contentClient.getSubjectById(id)
            .then(subjectData => setSubject(subjectData));
        });
    }
  }

  return (
    <>
      <Helmet>
        <title>Reviewton - {subject.name}</title>
      </Helmet>
      <div className='page-header'>
        <div className='content-info'>
          <h1>{subject?.name}</h1>
          <h1 style={{textAlign: 'center'}}>
            <p style={{color: '#ffd700', padding: 0}}>{subject?.rating.toFixed(2)}</p>
            <StarRating style={{marginTop: '-12px'}} rating={subject?.rating} /></h1>
        </div>  
        <div className='content-info'>
          <div>
            <p className='count'>Підписників: {subject?.subscribers}</p>
            <p className='count'>Відгуків: {subject?.articleCount}</p>
          </div>
          <div>     
            {
              (userStore?.user?.subjectSubscriptions || []).some(sub => sub._id === subject?._id) ?
                <Button outlined danger text='Відписатися' onClick={upsertSubscription} /> :
                <Button outlined text='Стежити' onClick={upsertSubscription} />
            }
          </div>
        </div>
      </div>
      <ArticleFeed 
        key={id} 
        socketStore={socketStore}
        userStore={userStore} receive={contentClient.getArticlesBySubjectId} args={[id]} />
    </>
  );
});

Subject.propTypes = {
  user: PropTypes.object
};

export default Subject;
