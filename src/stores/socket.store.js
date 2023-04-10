import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';

export default class SocketStore {
  socket = null;
  connected = false;
  _articles = {};
  _articleArgs = {};

  constructor() {
    makeAutoObservable(this);    
    this.socket = io(process.env.REACT_APP_SERVER_URL);
    this.socket.on('connect', () => {
      this.setConnected(true);
    });
    this.socket.on('disconnect', (reason) => {
      this.setConnected(false);
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket.connect();
      }
    });
  }

  setConnected(value) {
    this.connected = value;
  }

  subscribeArticleUpdate(id, commentsRender = false) {
    if (!this._articleArgs[id]) {
      this._articleArgs[id] = {listener: this._updateArticle.bind(this)};
      this.socket.on(`article-update-${id}`, this._articleArgs[id].listener);
    }
    
    this._articleArgs[id].closed = false;
    const token = localStorage.getItem('token');
    if (!this._articles[id] ||
      this._articleArgs[id].commentsRender !== commentsRender ||
      this._articleArgs[id].token !== token) {
      this._articleArgs[id].commentsRender = commentsRender;
      this._articleArgs[id].token = localStorage.getItem('token');
      this._emit('article-feed:subscribe', {
        article: id,
        commentsRender
      });
    }
  }


  unsubscribeArticleUpdate(id) {
    if (this._articleArgs[id]) {
      this._articleArgs[id].closed = true;
      setTimeout(() => {
        if (this._articleArgs[id] && this._articleArgs[id].closed) {
          this._emit('article-feed:unsubscribe', {
            article: id
          });
          this.socket.off(`article-update-${id}`, this._articleArgs[id].listener);
          delete this._articles[id];
          delete this._articleArgs[id];
        }
      }, 60 * 1000);
    }
  }

  subscribeArticleComments(id) {
    this._emit('article-feed:subscribe-comments', {
      article: id
    });
  }

  estimateArticle(id, reaction) {
    this._emit('article-feed:estimate-article', {
      article: id,
      reaction
    });
  }

  upsertComment(id, text, comment = undefined) {
    this._emit('article-feed:upsert-comment', {
      article: id,
      text,
      comment
    });
  }

  _updateArticle(data) {
    this._articles[data._id] = data;
  }

  _emit(path, data) {
    const token = localStorage.getItem('token');
    this.socket.emit(path, {
      data: {
        ...data,
        authorization: `Bearer ${token}`
      }
    });
  }

  get articles () {
    return this._articles;
  }
}
