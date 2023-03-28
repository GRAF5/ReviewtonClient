import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import calcTime from '../../utils/calcTime';
import Form from '../form/form';
import './comment.css';
import PropTypes from 'prop-types';

// eslint-disable-next-line complexity
export default function Comment({comment, user, replyNum, onCloseReply, socket, ...props}) {
  const [answer, setAnswer] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const navigate = useNavigate();
  function navigateUser(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/users/${id}`);
    }
  }
  function closeReply(e) {
    if (!e.key || e.key === 'Enter') {
      setViewAnswers(false);
    }
  }
  function answerSend(data) {
    if (data.text) {
      socket.emit('article-feed:upsert-comment', {
        data: {
          text: data.text, 
          comment: comment._id, 
          article: comment.article, 
          authorization: `Bearer ${user?.token}`}});
      setAnswer(false);
      setViewAnswers(true);
    }
  }
  function onAnswer(e, value) {
    if (!e.key || e.key === 'Enter') {
      setAnswer(value);
    }
  }
  return (
    <div style={{marginBottom: '10px'}}>
      <div style={{'display': 'flex', 'alignItems': 'center'}}>
        {replyNum ? <p 
          tabIndex={0}
          className='thread'
          onClick={e => onCloseReply(e)}
          onKeyDown={e => onCloseReply(e)}>{'●\u00A0\u00A0\u00A0'.repeat(Math.min(replyNum - 1, 4)) + '○'}</p> : null}
        <div  className={'comment'}>
          <div style={{'display': 'flex', 'alignItems': 'center'}}>
            <p 
              id='login' 
              tabIndex={0}
              className={comment.user._id === (user || {}).id ? 'self' : ''}
              onClick={(e) => navigateUser(e, comment.user._id)}
              onKeyDown={(e) => navigateUser(e, comment.user._id)}>{comment.user.login}
            </p> 
            &nbsp;&nbsp;
            <p id='time'>{calcTime(comment.createTime)}</p>
          </div>
          <p id='text'>{comment.text}</p>
          {
            comment.replyCount || (!answer && user) ?
              <div className='comment-footer'>
                <div style={{'display': 'flex'}}>
                  { 
                    comment.replyCount ? 
                      !viewAnswers ? 
                        <p 
                          tabIndex={0} 
                          id='answer' 
                          onClick={(e) => setViewAnswers(true)} 
                          onKeyDown={(e) => setViewAnswers(true)}>▼({comment.replyCount})</p> : 
                        <p 
                          id='answer' 
                          onClick={(e) => closeReply(e)}
                          onKeyDown={(e) => closeReply(e)}>▲</p> : null
                  }
                  { 
                    user && !answer ? 
                      <p 
                        tabIndex={0} 
                        id='answer' 
                        onClick={(e) => onAnswer(e, true)} 
                        onKeyDown={(e) => onAnswer(e, true)}>Відповісти</p> : null}
                </div>
              </div> : null
          }
          {answer ? <Form elements={[
            {
              id: `answer/${comment._id}`,
              type: 'input', 
              name: 'text',
              placeholder: 'Напишіть відповідь', 
              resizeble: true,
              inlines: [{
                type: 'button',
                outlined: true,
                danger: true,
                onClick: () => {setAnswer(false);},
                childs:
                  <svg 
                    style={{height: '20px'}}
                    version="1.1" 
                    viewBox="0 0 512 512" 
                    xmlSpace="preserve" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fill="currentColor" 
                      // eslint-disable-next-line max-len
                      d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                  </svg>
              }, {
                type: 'reset',
                values: ['text'],
                text: '➤',
                onClick: answerSend
              }]
            }]}/> : null}
        </div>
      </div>
      {
        viewAnswers ? 
          comment.answers.map(el => 
            <Comment 
              onCloseReply={closeReply} 
              key={el._id} 
              replyNum={(replyNum || 0) + 1} 
              comment={el} 
              user={user} 
              socket={socket}/>) : null
      }
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object,
  replyNum: PropTypes.number,
  onCloseReply: PropTypes.func,
  socket: PropTypes.object
};
