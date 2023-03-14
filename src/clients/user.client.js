import config from '../config';
import handleResponse from './handleResponse';

export const userClient = {
  register,
  authenticate,
  current
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
  return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/user/register`, opts).then(res => handleResponse(res));
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
  return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/user/authenticate`, opts).then(res => handleResponse(res));
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
    return fetch(`${process.env.REACT_APP_SERVER_URL || config.serverUrl}/authorization/current`, opts).then(res => handleResponse(res));
  }
  return new Promise(res => res);
}