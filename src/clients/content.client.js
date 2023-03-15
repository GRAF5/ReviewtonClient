import config from '../config';
import handleResponse from './handleResponse';

export const contentClient = {
  getArticles,
  getComments,
  getAnswers,
  createComment,
  createAnswer
}

/**
 * Get articles
 * @returns {Promise<Object>} return response object
 */
function getArticles(limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/content/articles?limit=${limit}&offset=${offset}`, opts).then(res => handleResponse(res));
}

/**
 * Get article comments
 * @param {String} articleId article id
 * @returns {Promise<Object>} return response object
 */
function getComments(articleId) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/content/articles/${articleId}/comments`, opts).then(res => handleResponse(res));
}

/**
 * Get comment answers
 * @param {String} articleId article id
 * @param {String} commentId comment id
 * @returns {Promise<Object>} return response object
 */
function getAnswers(articleId, commentId) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/content/articles/${articleId}/comments/${commentId}/answers`, opts).then(res => handleResponse(res));
}

/**
 * Add comment to article
 * @param {String} text comment text 
 * @param {String} articleId articleId
 * @param {String} token user token 
 * @returns {Promise}
 */
function createComment(text, articleId, token) {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({text})
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/content/articles/${articleId}/comments`, opts).then(res => handleResponse);
}

/**
 * Add answer to comment
 * @param {String} text answer text 
 * @param {String} articleId article id 
 * @param {String} commentId comment id
 * @param {String} token user token
 * @returns {Promise}
 */
function createAnswer(text, articleId, commentId, token) {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({text})
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/content/articles/${articleId}/comments/${commentId}`, opts).then(res => handleResponse);
}
