/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import useWindowSize from '../../utils/useWindowSize';
import StarRating from '../star-rating/star-rating';
import parseHTML from 'html-react-parser';
import './article.css'
import { useNavigate } from 'react-router';
import { socket } from '../../socket';
import Comment from '../comment/comment';
import Form from '../form/form';
import Button from '../button/button';
import { withIsVisible } from 'react-is-visible';

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
function Article({article, isVisible, user, ...props}) {
  const navigate = useNavigate();
  // const nodeRef = useRef();
  // const isVisible = useIsVisible(nodeRef);
  const [data, setData] = useState(article);
  const {width, contentWidth} = useWindowSize();
  const [commentsRender, setCommentsRender] = useState(false);

  useEffect(() => {
    socket.connect();
    return () => {
      if (socket) {
        socket.emit('article-feed:unsubscribe', {data: {article: article._id}});
      }
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(`article-update-${article._id}`, setData);
    }
  }, [socket]);

  useEffect(() => {
    if (isVisible && socket) {
      socket.emit('article-feed:subscribe', {data: {commentsRender, article: article._id, authorization: `Bearer ${user?.token}`}})
    } else if (socket) {
      socket.emit('article-feed:unsubscribe', {data: {article: article._id}});
    }
  }, [isVisible, user, socket]);

  function getComments(e = {}) {
    if (!e.key || e.key === 'Enter') {
      socket.emit('article-feed:subscribe-comments', {data: {article: article._id}});
    }
  }
  function comment(data) {
    if (data.text) {
      socket.emit('article-feed:upsert-comment', {data: {text: data.text, article: article._id, authorization: `Bearer ${user?.token}`}});
      // contentClient.createComment(data.text, article._id, user.token).then(() => {
      //   getComments();
      // });
    }
  }
  function handleLike(e) {
    if (!e.key || e.key === 'Enter') {
      if (data.userReaction === true) {
        socket.emit('article-feed:estimate-article', {data: {reaction: undefined, article: article._id, authorization: `Bearer ${user?.token}`}});
      } else {
        socket.emit('article-feed:estimate-article', {data: {reaction: true, article: article._id, authorization: `Bearer ${user?.token}`}});
      }
    }
  }
  function handleDislike(e) {
    if (!e.key || e.key === 'Enter') {
      if (data.userReaction === false) {
        socket.emit('article-feed:estimate-article', {data: {reaction: undefined, article: article._id, authorization: `Bearer ${user?.token}`}});
      } else {
        socket.emit('article-feed:estimate-article', {data: {reaction: false, article: article._id, authorization: `Bearer ${user?.token}`}});
      }
    }
  }
  function navigateUser(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/users/${id}`)
    }
  }
  function navigateSubject(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/subjects/${id}`)
    }
  }
  function navigateTag(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/tags/${id}`)
    }
  }
  function calcTime(time) {
    let date = new Date(time);
    // let milliseconds = Date.now() - date.getTime();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
    // let seconds = Math.round(milliseconds / 1000);
    // if (seconds < 60) {
    //   return seconds;
    // }
    // let minutes = Math.round(seconds / 60);
    // if (minutes < 60) {
    //   return minutes;
    // }
    // let hours = Math.round(minutes / 60);
    // if (hours <  24) {
    //   return hours;
    // }
    // let days = Math.round(hours / 24);
    // if (days < 30) {
    //   return days;
    // }
    // let months = Math.round(days / 30);
    // if (months < 12) {
    //   return months;
    // }
    // let years = Math.round(months / 12);
    // return years;
  }

  function setAnswers(comment) {
    comment.answers = data.comments.filter(c => c.comment === comment._id);
    comment.answers.forEach(ans => setAnswers(ans));
  }

  const commentsComp = commentsRender ? 
    <div className='comments'>
      {
        user? 
          <Form elements={[
            {
              id: `comment/${article._id}`,
              name: 'text',
              type: 'input', 
              placeholder: 'Напишіть коментар', 
              resizeble: true,
              inlines: [{
                type: 'button',
                outlined: true,
                danger: true,
                onClick: () => {setCommentsRender(false); socket.emit('article-feed:unsubscribe-comments', {data: {article: article._id}});},
                text: '🗙'
              }, {
                type: 'reset',
                values: ['text'],
                text: '➤',
                onClick: comment
              }]
            }]} 
          />
        : <Button 
            style={{
              'marginTop': '10px'
            }
            }
            outlined
            danger
            text='🗙'
            onClick={ () => {setCommentsRender(false); socket.emit('article-feed:unsubscribe-comments', {data: {article: article._id}})}} />
      }
      {(data.comments || []).map(el => {
        if (!el.comment) {
          setAnswers(el);
          return(
            <>
              <Comment 
                comment={{...el, createTime: calcTime(el.createTime)}} 
                user={user} 
                socket={socket} />
            </>)
        }
        return null;
      })}
    </div>
    :
    null;
  return (
    <div className={contentWidth === width ? 'content' : 'bordered-content'}>
      <p 
        id='login'
        tabIndex={0}
        onClick={(e) => navigateUser(e, article.user._id)} 
        onKeyDown={(e) => navigateUser(e, article.user._id)}>{article.user.login}</p>
      <div style={{
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'space-between',
        'marginBottom': '15px'
      }}>
        <h1 
          tabIndex={0}
          id='subject'
          onClick={(e) => navigateSubject(e, article.subject._id)} 
          onKeyDown={(e) => navigateSubject(e, article.subject._id)}>
          {article.subject.name}</h1>
        <StarRating rating={data.rating} />
      </div>
      <div style={{
        'marginBottom': '15px'
      }}>
        {parseHTML(data.text, {library: {key: 'key'}})}
      </div>
      <div style={{
        'display': 'flex'
      }}>
        {article.tags.map(tag => 
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
          'justifyContent': 'space-between',
        }}>
          <div style={{
              'display': 'flex',
              'alignItems': 'center'
          }}>
            <div 
              tabIndex={0} 
              className={`like ${data.userReaction === true ? 'setted': ''}`} 
              style={{'marginRight': '15px'}} 
              onClick={(e) => handleLike(e)} 
              onKeyDown={(e) => handleLike(e)}>
              <svg className='like-icon' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox='0 0 48 48'><path fill="none" d="M0 0h48v48H0z"/><path fill="currentColor" d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1A4 4 0 0 0 46 24v-3.83l-.02-.02L46 20z"/></svg>
              &nbsp;
              {data.likes || 0}
            </div>
            <div 
              tabIndex={0} 
              className={`dislike ${data.userReaction === false ? 'setted': ''}`} 
              onClick={(e) => handleDislike(e)} 
              onKeyDown={(e) => handleDislike(e)}>
              <svg className='dislike-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" opacity=".87"/><path fill="currentColor" d="M10.88 21.94l5.53-5.54c.37-.37.58-.88.58-1.41V5c0-1.1-.9-2-2-2H6c-.8 0-1.52.48-1.83 1.21L.91 11.82C.06 13.8 1.51 16 3.66 16h5.65l-.95 4.58c-.1.5.05 1.01.41 1.37.59.58 1.53.58 2.11-.01zM21 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
              &nbsp;
              {data.dislikes || 0}
            </div>
          </div>
        </div>
        <div className='views'>
          <svg className='views-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" fill="currentColor"></path> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="currentColor"></path> </svg> 
          &nbsp;
          {data.views}
          &nbsp;
          {calcTime(article.createTime)}
        </div>
      </div>
      <div style={{'borderTop': '1px solid var(--third-dark)'}}>
          {
            commentsRender ? 
              commentsComp
              :
              <p 
                tabIndex={0} 
                style={{
                  'cursor': 'pointer',
                  'marginTop': '20px',
                  'color': 'var(--third-dark)'
                }} 
                onClick={(e) => {getComments(e); setCommentsRender(true)}}
                onKeyDown={(e) => {getComments(e); setCommentsRender(true)}}>Коментарі ({data.commentsCount})</p>
          }
      </div>
    </div>
  )
}

export default withIsVisible(Article);
