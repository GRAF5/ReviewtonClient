import handleResponse from './handleResponse';

export const contentClient = {
  getArticles,
  getArticlesByUserId,
  getArticlesBySubjectId,
  getArticlesByTagId,
  createArticle,
  getSubjects,
  getSubjectById,
  getTags,
  getTagById
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
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles?limit=${limit}&offset=${offset}`, opts).then(res => handleResponse(res));
}

function getArticlesByUserId(userId, limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/user/${userId}?limit=${limit}&offset=${offset}`, opts).then(res => handleResponse(res));
}

function getArticlesBySubjectId(subjectId, limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/subject/${subjectId}?limit=${limit}&offset=${offset}`, opts).then(res => handleResponse(res));
}

function getArticlesByTagId(tagId, limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/tag/${tagId}?limit=${limit}&offset=${offset}`, opts).then(res => handleResponse(res));
}

function getSubjects(filter = '') {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/subjects?${ filter !== '' ? `filter=${filter}`: ''}`, opts).then(res => handleResponse(res));
}

function getSubjectById(id) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/subjects/${id}`, opts).then(res => handleResponse(res));
}

function getTags(filter = '') {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/tags?${ filter !== '' ? `filter=${filter}`: ''}`, opts).then(res => handleResponse(res));
}

function getTagById(id) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/tags/${id}`, opts).then(res => handleResponse(res));
}

function createArticle(data) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles`, opts).then(res => handleResponse(res));
}
