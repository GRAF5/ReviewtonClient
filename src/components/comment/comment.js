import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from '../form/form';
import './comment.css'

export default function Comment({comment, user, replyNum, onCloseReply, socket, ...props}) {
  const [answer, setAnswer] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const navigate = useNavigate();
  function navigateUser(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/users/${id}`)
    }
  }
  function closeReply(e) {
    if (!e.key || e.key === 'Enter') {
      setViewAnswers(false);
    }
  }
  function answerSend(data) {
    if (data.text) {
      socket.emit('article-feed:upsert-comment', {data: {text: data.text, comment: comment._id, article: comment.article, authorization: `Bearer ${user?.token}`}});
      setAnswer(false);
      setViewAnswers(true);
    }
  }
  function onAnswer(e, value) {
    if (!e.key || e.key === 'Enter') {
      setAnswer(value)
    }
  }
  return (
    <div style={{marginBottom: '10px'}}>
      <div style={{'display': 'flex', 'alignItems': 'center'}}>
      {replyNum ? <p 
                    tabIndex={0}
                    className='thread'
                    onClick={e => onCloseReply(e)}
                    onKeyDown={e => onCloseReply(e)}>{'●\u00A0\u00A0\u00A0'.repeat(Math.min(replyNum -1, 4)) + '○'}</p> : null}
      <div style={{
      }} className={`comment`}>
        <div style={{'display': 'flex', 'alignItems': 'center'}}>
          <p 
            id='login' 
            tabIndex={0}
            className={comment.user._id === (user || {}).id ? 'self' : ''}
            onClick={(e) => navigateUser(e, comment.user._id)}
            onKeyDown={(e) => navigateUser(e, comment.user._id)}>{comment.user.login}</p> 
          &nbsp;&nbsp;
          <p id='time'>{comment.createTime}</p>
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
                        onKeyDown={(e) => setViewAnswers(true)}>▼({comment.replyCount})</p> 
                    : <p 
                        id='answer' 
                        onClick={(e) => closeReply(e)}
                        onKeyDown={(e) => closeReply(e)}>▲</p>
                  : null
                }
                { user && !answer ? <p tabIndex={0} id='answer' onClick={(e) => onAnswer(e, true)} onKeyDown={(e) => onAnswer(e, true)}>Відповісти</p> : null}
              </div>
            </div>
          : null
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
              onClick: () => {setAnswer(false)},
              text: '🗙'
            },{
              type: 'reset',
              values: ['text'],
              text: '➤',
              onClick: answerSend
            }]
          }]}/> : null}
      </div>
      </div>
      {
        viewAnswers ? comment.answers.map(el => <Comment onCloseReply={closeReply} key={el._id} replyNum={(replyNum || 0) + 1} comment={{...el}} user={user} socket={socket}/>) : null
      }
    </div>
  )
}