import { makeAutoObservable } from 'mobx';

/**
 * @typedef User
 * @property {String} id user id
 * @property {String} token user token signed with
 * @property {String} email user email
 * @property {String} login user login
 * @property {String} role user role
 */

/**
 * User store class
 */
export default class UserStore {
  user = null;

  /**
   * Constructs user store
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set user data
   * @param {User} user user data 
   */
  setUser(user) {
    this.user = user;
    localStorage.setItem('token', this.user.token);
  }

  /**
   * Clear user data
   */
  exit() {
    this.user = null;
    localStorage.removeItem('token');
  }

  checkAccessByRole(role) {
    switch (role) {
    case 'user': {
      return true;
    }
    case 'moderator': {
      return this.user.role === 'moderator' ||
        this.user.role.includes('admin');
    }
    case 'admin': {
      return this.user.role.includes('admin');
    }
    default: {
      return false;
    }
    }
  }
}
