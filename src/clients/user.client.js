import handleResponse from './handleResponse';

export const userClient = {
  register,
  authenticate,
  current,
  getUserById,
  addTagSubscription,
  removeTagSubscription,
  addSubjectSubscription,
  removeSubjectSubscription,
  addUserSubscription,
  removeUserSubscription
};

/**
 * Register new user
 * @param {Object} data new user data 
 * @param {String} data.email user emeil
 * @param {String} data.login user login
 * @param {String} data.password user password
 * @param {String} data.passwordRepeat repeated password
 * @returns 
 */
function register(data) {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/register`, opts).then(res => handleResponse(res));
}

/**
 * Authenticate user
 * @param {Object} data user data
 * @param {String} data.credentials user login or emeil
 * @param {String} data.password user password
 * @returns {Promise<Object>}  return response object
 */
function authenticate(data) {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/authenticate`, opts).then(res => handleResponse(res));
}

/**
 * Authenticate user by local token
 * @returns {Promise<Object>}  return response object
 */
function current() {
  const token = localStorage.getItem('token');
  if (token) {
    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/authorization/current`, opts).then(res => handleResponse(res));
  }
  return new Promise(res => res);
}

function getUserById(id) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, opts).then(res => handleResponse(res));
}

function addTagSubscription(subscription) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/current/subscriptions/tags/${subscription}`, opts)
    .then(res => handleResponse(res));
}

function removeTagSubscription(subscription) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/current/subscriptions/tags/${subscription}`, opts)
    .then(res => handleResponse(res));
}

function addSubjectSubscription(subscription) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/current/subscriptions/subjects/${subscription}`, opts)
    .then(res => handleResponse(res));
}

function removeSubjectSubscription(subscription) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/current/subscriptions/subjects/${subscription}`, opts)
    .then(res => handleResponse(res));
}

function addUserSubscription(subscription) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/current/subscriptions/users/${subscription}`, opts)
    .then(res => handleResponse(res));
}

function removeUserSubscription(subscription) {
  const token = localStorage.getItem('token');
  const opts = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/current/subscriptions/users/${subscription}`, opts)
    .then(res => handleResponse(res));
}
