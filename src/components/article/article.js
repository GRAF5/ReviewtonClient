import React, { useState, useEffect } from 'react';
import useWindowSize from '../../utils/useWindowSize';
import StarRating from '../star-rating/star-rating';
import parseHTML from 'html-react-parser';
import { useNavigate } from 'react-router';
import Comment from '../comment/comment';
import Form from '../form/form';
import Button from '../button/button';
import { withIsVisible } from 'react-is-visible';
import calcTime from '../../utils/calcTime';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import './article.css';
import { observer } from 'mobx-react-lite';

/**
 * @typedef Tag
 * @property {String} _id tag id
 * @property {String} name tag title
 */

/**
 * @typedef Subject
 * @property {String} _id subject id
 * @property {String} name subject title
 * @property {Number} rating subject rating
 */

/**
 * @typedef User
 * @property {String} _id user id
 * @property {String} login user login
 * @property {String} [token] active user token
 */

/**
 * @typedef Article
 * @property {String} _id article id
 * @property {User} user article author
 * @property {String} text article text
 * @property {Number} [likes] article likes count
 * @property {Number} [dislikes] article dislikes count
 * @property {Number} views article views count
 * @property {Number} createTime article create time
 * @property {Number} commentsCount article comments count
 * @property {Subject} subject article subject
 * @property {Array<Tag>} tags article tags
 */

/**
 * Render article
 * @param {Object} param0 
 * @param {Article} param0.article article to render
 * @param {User|null} param0.user active user
 * @returns 
 */
// eslint-disable-next-line complexity
const Article = observer(({article, info, isVisible, user, socketStore, ...props}) => {
  const navigate = useNavigate();
  const data = {...article, ...socketStore.articles[article._id]};
  const {width, contentWidth} = useWindowSize();
  const [isOptions, setIsOptions] = useState(false);
  const [options, setOptions] = useState();
  const option = React.useRef();

  useEffect(() => {
    socketStore.subscribeArticleUpdate(article._id, info);
    return () => {
      socketStore.unsubscribeArticleUpdate(article._id);
    };
  }, []);

  useEffect(() => {
    if ((isVisible || info)) {
      socketStore.subscribeArticleUpdate(article._id, info);
    } else if (socketStore.socket) {
      socketStore.unsubscribeArticleUpdate(article._id);
    }
  }, [isVisible, user]);

  function comment(commentData) {
    if (!user) {
      return navigate('/login');
    }
    if (commentData) {
      socketStore.upsertComment(article._id, commentData);
    }
  }
  function handleLike(e) {
    if (!e.key || e.key === 'Enter') {
      e.stopPropagation();
      if (data?.userReaction === true) {
        _emitEstimateArticle(undefined);
      } else {
        _emitEstimateArticle(true);
      }
    }
  }
  function _emitEstimateArticle(reaction) {
    if (!user) {
      return navigate('/login');
    }
    socketStore.estimateArticle(article._id, reaction);
  }
  function handleDislike(e) {
    if (!e.key || e.key === 'Enter') {
      e.stopPropagation();
      if (data?.userReaction === false) {
        _emitEstimateArticle(undefined);
      } else {
        _emitEstimateArticle(false);
      }
    }
  }
  function navigateUser(e, id) {
    if (!e.key || e.key === 'Enter') {
      e.stopPropagation();
      navigate(`/users/${id}`);
    }
  }
  function navigateSubject(e, id) {
    e.stopPropagation();
    if (!e.key || e.key === 'Enter') {
      navigate(`/subjects/${id}`);
    }
  }
  function navigateTag(e, id) {
    if (!e.key || e.key === 'Enter') {
      e.stopPropagation();
      navigate(`/tags/${id}`);
    }
  }
  function navigateArticle(e) {
    if (info) {
      return;
    }
    if (!e.key || e.key === 'Enter') {
      e.stopPropagation();
      navigate(`/articles/${article._id}`);
    }
  }
  function navigateChangeArticle(e) {
    if (!e.key || e.key === 'Enter') {
      e.stopPropagation();
      navigate(`/articles/change/${article._id}`);
    }
  }

  function setAnswers(id) {
    return data?.comments.filter(c => c.comment === id).map(ans => {return {...ans, answers: setAnswers(ans._id)};});
  }
  function isOverflown() {
    let element = document.getElementById(`${article._id}-text`);
    if (!element) {
      return false;
    }
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }
  function handleOptions(e) {
    if (!e.key || e.key === 'Enter') {
      e.stopPropagation();
      setIsOptions(!isOptions);
      if (!isOptions) {
        setOptions(
          <ul className='options' style={{
            position: 'absolute',
            left: option.current.offsetLeft,
            top: option.current.offsetTop
          }}>
            <li tabIndex={0} 
              onClick={navigateChangeArticle} 
              onKeyDown={navigateChangeArticle}>Змінити</li>
          </ul>);
      }
    }
  }

  const commentsComp = info ? 
    <div className='comments'>
      <Form elements={[
        {
          id: `comment/${article._id}`,
          name: 'text',
          type: 'input', 
          placeholder: 'Напишіть коментар', 
          resizeble: true,
          button: {
            text: '➤',
            onClick: comment,
            reset: true
          }
        }]} 
      />
      {(data?.comments || []).map((el, i) => {
        if (!el.comment) {
          return (
            <Comment 
              key={el._id}
              comment={el} 
              answers={setAnswers(el._id)}
              user={user} 
              socketStore={socketStore} />);
        }
        return null;
      })}
    </div> : null;
  return (
    <article className={contentWidth === width ? 'content' : 'bordered-content'}
      onClick={navigateArticle}
      onKeyDown={navigateArticle}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h4 
          id='login'
          tabIndex={0}
          onClick={(e) => navigateUser(e, article.user._id)} 
          onKeyDown={(e) => navigateUser(e, article.user._id)}>{article.user.login}
        </h4>
        <div
          ref={option} 
          style={{display: 'flex'}}>
          <p id='time'>{calcTime(article.createTime)}</p>
          &nbsp;
          &nbsp;
          {
            user && article.user._id === user.id ?
              <svg 
                tabIndex={0}
                onClick={handleOptions}
                onKeyDown={handleOptions}
                className='article-menu'
                viewBox="0 0 16 16" 
                xmlns="http://www.w3.org/2000/svg" 
              >
                <path 
                  fill="currentColor" 
                  // eslint-disable-next-line max-len
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              </svg> : null
          }          
          {isOptions ? <>
            {  width >= 1276 ? <div style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '340px',
              height: '100%',
              zIndex: 3000
            }}
            onClick={handleOptions}></div> : null}          
            <div style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 800
            }}
            onClick={handleOptions}></div>          
            <div style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              height: '70px',
              zIndex: 2000
            }}
            onClick={handleOptions}></div>          
            {options}
          </> : null}
        </div>
      </div>
      <div style={{
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'space-between',
        'marginBottom': '15px'
      }}>
        <h1 
          tabIndex={0}
          id='subject'
          onClick={(e) => navigateSubject(e, data.subject._id)} 
          onKeyDown={(e) => navigateSubject(e, data.subject._id)}>
          {data.subject.name}</h1>
        <StarRating rating={data?.rating} />
      </div>
      <div 
        style={{
          maxHeight: info ? undefined : '300px',
          cursor: info ? 'text' : 'pointer',
          overflow: 'hidden',
          padding: '0'
        }}
        className='ql-editor article-text' id={`${article._id}-text`}
        onClick={navigateArticle}
        onKeyDown={navigateArticle}>
        {parseHTML(data?.text)}
      </div>
      {isOverflown() ? <div 
        style={{
          cursor: 'pointer',
          transform: 'translate(0px, -315px)',
          width: `${contentWidth - (contentWidth === width ? 50 : 124)}px`,
          height: '300px',
          zIndex: 5,
          position: 'absolute',
          alignItems: 'end',
          display: 'flex'
        }}
        onClick={navigateArticle}
        onKeyDown={navigateArticle}
        className='overflow'>
        <Button 
          onClick={navigateArticle}
          onKeyDown={navigateArticle}
          outlined text='Прочитати' />
      </div> : null}
      <div style={{
        'display': 'flex',
        flexWrap: 'wrap'
      }}>
        {data.tags.map(tag => 
          <div 
            tabIndex={0} 
            key={tag._id} 
            className='rounded' 
            onClick={(e) => navigateTag(e, tag._id)} 
            onKeyDown={(e) => navigateTag(e, tag._id)}>
            {tag.name}
          </div>)}
      </div>
      <div style={{
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'space-between',
        'marginBottom': '20px'
      }}>
        <div style={{
          'display': 'flex',
          'alignItems': 'center',
          'justifyContent': 'space-between'
        }}>
          <div style={{
            'display': 'flex',
            'alignItems': 'center'
          }}>
            <div 
              tabIndex={0} 
              className={`like ${data?.userReaction === true ? 'setted' : ''}`} 
              style={{'marginRight': '15px'}} 
              onClick={(e) => handleLike(e)} 
              onKeyDown={(e) => handleLike(e)}>
              <svg 
                className='like-icon' 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox='0 0 48 48'
              >
                <path fill="none" d="M0 0h48v48H0z"/>
                <path 
                  fill="currentColor" 
                  // eslint-disable-next-line max-len
                  d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1A4 4 0 0 0 46 24v-3.83l-.02-.02L46 20z"/>
              </svg>
              &nbsp;
              {data?.likes || 0}
            </div>
            <div 
              tabIndex={0} 
              className={`dislike ${data?.userReaction === false ? 'setted' : ''}`} 
              onClick={(e) => handleDislike(e)} 
              onKeyDown={(e) => handleDislike(e)}>
              <svg 
                className='dislike-icon' 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
              >
                <path 
                  fill="none" 
                  d="M0 0h24v24H0V0z" 
                  opacity=".87"/>
                <path 
                  fill="currentColor" 
                  // eslint-disable-next-line max-len
                  d="M10.88 21.94l5.53-5.54c.37-.37.58-.88.58-1.41V5c0-1.1-.9-2-2-2H6c-.8 0-1.52.48-1.83 1.21L.91 11.82C.06 13.8 1.51 16 3.66 16h5.65l-.95 4.58c-.1.5.05 1.01.41 1.37.59.58 1.53.58 2.11-.01zM21 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
              &nbsp;
              {data?.dislikes || 0}
            </div>
          </div>
        </div>
        <div className='views'>
          <svg 
            className='views-icon' 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          > 
            <path 
              fill="currentColor"
              // eslint-disable-next-line max-len
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path> 
            <path 
              fill="currentColor"
              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
          </svg> 
          &nbsp;
          {data?.views}
        </div>
      </div>
      <div style={{'borderTop': '1px solid var(--third-dark)'}}>
        {
          info ? 
            commentsComp :
            <p 
              tabIndex={0} 
              style={{
                'cursor': 'pointer',
                'marginTop': '20px',
                'color': 'var(--third-dark)'
              }} 
              onClick={navigateArticle}
              onKeyDown={navigateArticle}>Коментарі ({data?.commentsCount})</p>
        }
      </div>
    </article>
  );
});

Article.propTypes = {
  article: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
  user: PropTypes.object,
  info: PropTypes.bool,
  socketStore: PropTypes.object
};

export default withIsVisible(Article);
