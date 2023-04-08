import React, { useEffect, useState } from 'react';
import Article from '../../components/article/article';
import { socket } from '../../socket';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ArticleFeed = ({user, pageName, receive, ...props}) => {
  const [connected, setConnected] = useState(socket.connected);
  const [articles, _setArticles] = useState(history.state.articles || []);
  
  const location = useLocation();

  let [searchParams] = useSearchParams();
  const filterRef = React.useRef(searchParams.get('filter'));
  const setFilter = data => {
    filterRef.current = data;
  };
  const articlesRef = React.useRef(articles);
  const setArticles = data => {
    articlesRef.current = data;
    _setArticles(data);
  };
  const [offset, _setOffset] = useState((history.state.articles || []).length);
  const offsetRef = React.useRef(offset);
  const setOffset = data => {
    offsetRef.current = data;
    _setOffset(data);
  };
  const [loadProcessing, _setLoadProcessing] = useState(false);
  const loadProcessingRef = React.useRef(loadProcessing);
  const setLoadProcessing = data => {
    loadProcessingRef.current = data;
    _setLoadProcessing(data);
  };
  const [lastLoad, _setLastLoad] = useState(0);
  const lastLoadRef = React.useRef(lastLoad);
  const setLastLoad = data => {
    lastLoadRef.current = data;
    _setLastLoad(data);
  };

  function scrollListener() {
    if (getScrollPercent() >= 80) {
      loadArticles.bind(this)();
    }
  }

  function loadArticles() {
    if (!loadProcessingRef.current) {
      setLastLoad(Date.now);
      setLoadProcessing(true);
      receive(filterRef.current, process.env.REACT_APP_ARTICLE_FEED_LIMIT, offsetRef.current)
        .then(res => {
          if (res.articles.length > 0) {
            let resArt = articlesRef.current.concat(
              res.articles.filter(r_a => !articlesRef.current.some(a => a._id === r_a._id)));
            setOffset(resArt.length);
            setArticles(resArt);
            window.addEventListener('scroll', scrollListener);
          } else {
            window.removeEventListener('scroll', scrollListener);
            setLoadProcessing(false);
          }
        })
        .catch(err => {
          setLoadProcessing(false);
        });
    }
  }

  useEffect(() => {
    if ((history.state.articles || []).length < articles.length) {
      setArticles((history.state.articles || []));
      setOffset(0);
    }
  }, [history.state]);

  useEffect(() => {
    setLoadProcessing(false);
    if (!articles.length) {
      loadArticles();
    }
    history.replaceState({articles}, '', location.pathname);
  }, [articles]);

  useEffect(() => {
    window.removeEventListener('scroll', scrollListener);
    setOffset(0);
    setArticles([]);
    setFilter(searchParams.get('filter'));
    // window.scroll(0, 0);
    window.addEventListener('scroll', scrollListener);
  }, [searchParams.get('filter'), pageName]);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
      loadArticles();
    }
    function onDisconnect() {
      setConnected(false);
      setLoadProcessing(false);
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    if (!(history.state.articles || []).length) {
      loadArticles();
    } else {
      setArticles(history.state.articles);
      setOffset(history.state.articles.length);
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  function getScrollPercent() {
    let h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
  }

  return (
    <div>
      {
        pageName ?
          <>
            <div className='page-header'>
              <h1>{searchParams.get('filter') || pageName}</h1>
            </div>
            <Helmet>
              <title>Reviewton - {pageName}</title>
            </Helmet>
          </> : null 
      }
      {
        articles.map(el => <Article key={el._id} article={el} user={user} />)
      }
      {
        loadProcessing && connected ? 
          <div style={{width: '100%', display: 'inline-grid', justifyItems: 'center'}}> 
            <svg 
              className='loading-icon' 
              viewBox="0 0 1024 1024" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                // eslint-disable-next-line max-len
                d="M512.056 908.647c-84.516 0-166.416-27.084-235.266-78.637-84.15-63.028-138.741-155.109-153.675-259.2-14.934-104.119 11.559-207.816 74.588-291.994 130.162-173.812 377.438-209.25 551.194-79.172 72.844 54.562 124.819 133.228 146.391 221.484 3.684 15.103-5.569 30.319-20.644 34.003-15.075 3.572-30.319-5.541-34.003-20.644-18.45-75.628-63-143.044-125.466-189.816-148.866-111.516-360.844-81.112-472.444 67.866-54.028 72.141-76.725 161.016-63.9 250.256 12.797 89.241 59.597 168.131 131.737 222.131 149.006 111.656 360.956 81.197 472.5-67.781 29.194-39.009 49.219-82.716 59.456-129.938 3.319-15.188 18.366-24.834 33.441-21.544 15.188 3.291 24.834 18.281 21.544 33.441-12.009 55.181-35.353 106.2-69.413 151.762-63.028 84.15-155.109 138.769-259.256 153.675-18.984 2.756-37.941 4.106-56.784 4.106z"/>
            </svg>
          </div> : null
      }
      {
        !connected ? 
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} className='screen-fade'>
            <svg 
              className='loading-icon white' 
              viewBox="0 0 1024 1024" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                // eslint-disable-next-line max-len
                d="M512.056 908.647c-84.516 0-166.416-27.084-235.266-78.637-84.15-63.028-138.741-155.109-153.675-259.2-14.934-104.119 11.559-207.816 74.588-291.994 130.162-173.812 377.438-209.25 551.194-79.172 72.844 54.562 124.819 133.228 146.391 221.484 3.684 15.103-5.569 30.319-20.644 34.003-15.075 3.572-30.319-5.541-34.003-20.644-18.45-75.628-63-143.044-125.466-189.816-148.866-111.516-360.844-81.112-472.444 67.866-54.028 72.141-76.725 161.016-63.9 250.256 12.797 89.241 59.597 168.131 131.737 222.131 149.006 111.656 360.956 81.197 472.5-67.781 29.194-39.009 49.219-82.716 59.456-129.938 3.319-15.188 18.366-24.834 33.441-21.544 15.188 3.291 24.834 18.281 21.544 33.441-12.009 55.181-35.353 106.2-69.413 151.762-63.028 84.15-155.109 138.769-259.256 153.675-18.984 2.756-37.941 4.106-56.784 4.106z"/>
            </svg>
          </div> : null
      }
    </div>
  );
};

ArticleFeed.propTypes = {
  user: PropTypes.object,
  filter: PropTypes.string,
  pageName: PropTypes.string,
  receive: PropTypes.func,
  reload: PropTypes.bool
};

export default ArticleFeed;
