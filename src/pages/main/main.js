/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { contentClient } from '../../clients/content.client';
import Article from '../../components/article/article';

export default function Main({user, ...props}) {
  const [articles, _setArticles] = useState([]);
  const articlesRef = React.useRef(articles);
  const setArticles = data => {
    articlesRef.current = data;
    _setArticles(data);
  }
  const [offset, _setOffset] = useState(0);
  const offsetRef = React.useRef(offset);
  const setOffset = data => {
    offsetRef.current = data;
    _setOffset(data);
  }
  const [loadProcessing, _setLoadProcessing] = useState(false);
  const loadProcessingRef = React.useRef(loadProcessing);
  const setLoadProcessing = data => {
    loadProcessingRef.current = data;
    _setLoadProcessing(data);
  }
  const [lastLoad, _setLastLoad] = useState(0);
  const lastLoadRef = React.useRef(lastLoad);
  const setLastLoad = data => {
    lastLoadRef.current = data;
    _setLastLoad(data);
  }

  function scrollListener() {
    if (getScrollPercent() >= 80) {
      loadArticles();
    }
  }

  function loadArticles() {
    if (!loadProcessingRef.current) {
      setLastLoad(Date.now);
      setLoadProcessing(true);
      contentClient.getArticles(process.env.REACT_APP_ARTICLE_FEED_LIMIT, offsetRef.current)
        .then(res => {
          if (res.articles.length > 0) {
            setOffset(offsetRef.current + res.articles.length);
            setArticles(articlesRef.current.concat(res.articles.filter(r_a => !articlesRef.current.some(a => a._id === r_a._id))));
          } else {
            window.removeEventListener('scroll', scrollListener);
          }
        });
    }
  }

  useEffect(() => {
    setLoadProcessing(false);
  }, [articles]);

  useEffect(() => {
    loadArticles();
    window.addEventListener('scroll', scrollListener.bind(this));
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  }

  return (
  <div>
    <div className='page-header'>
      <p>Нові</p>
    </div>
    {
      articles.map(el => <Article key={el._id} article={el} user={user} />)
    }
  </div>)
}