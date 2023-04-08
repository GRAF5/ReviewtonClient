import handleResponse from './handleResponse';

export const contentClient = {
  getArticles,
  getArticlesByUserId,
  getArticlesBySubjectId,
  getArticlesByTagId,
  getArticlesBySubscriptions,
  getArticleById,
  updateArticle,
  createArticle,
  getSubjects,
  getSubjectById,
  getTags,
  getTagById,
  getFilters
};

/**
 * Get articles
 * @returns {Promise<Object>} return response object
 */
function getArticles(filter = '', limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles?limit=${limit}&offset=${offset}&filter=${filter}`, 
    opts).then(res => handleResponse(res));
}

function getArticlesBySubscriptions(filter = '', limit = 1000, offset = 0) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/user/subscriptions` +
    `?limit=${limit}&offset=${offset}`, opts).then(res => handleResponse(res));
}

function getArticlesByUserId(userId, filter = '', limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/user/${userId}` +
    `?limit=${limit}&offset=${offset}&filter=${filter}`, opts).then(res => handleResponse(res));
}

function getArticlesBySubjectId(subjectId, filter = '', limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/subject/${subjectId}` + 
    `?limit=${limit}&offset=${offset}&filter=${filter}`, opts).then(res => handleResponse(res));
}

function getArticlesByTagId(tagId, filter = '', limit = 1000, offset = 0) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/tag/${tagId}` +
    `?limit=${limit}&offset=${offset}&filter=${filter}`, opts).then(res => handleResponse(res));
}

function getArticleById(id) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/${id}`, opts).then(res => handleResponse(res));
}

function getSubjects(filter = '') {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/subjects` +
    `?${ filter !== '' ? `filter=${filter}` : ''}`, opts).then(res => handleResponse(res));
}

function getSubjectById(id) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/subjects/${id}`, opts).then(res => handleResponse(res));
}

function getTags(filter = '') {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/tags` +
    `?${ filter !== '' ? `filter=${filter}` : ''}`, opts).then(res => handleResponse(res));
}

function getTagById(id) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
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

function updateArticle(id, data) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/articles/${id}`, opts).then(res => handleResponse(res));
}

function getFilters(filter = '') {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/content/filters/${filter}`, opts).then(res => handleResponse(res));
}
