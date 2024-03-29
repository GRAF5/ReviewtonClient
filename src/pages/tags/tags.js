import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { contentClient } from '../../clients/content.client';

export default function Tags({...props}) {
  const [tags, setTags] = useState([]);
  const [loadProcessing, setLoadProcessing] = useState(true);
  const navigate = useNavigate();

  function load() {
    setLoadProcessing(true);
    contentClient.getTags()
      .then(res => {
        setLoadProcessing(false);
        setTags(res.tags);
      })
      .catch(err => {
        load();
      });
  }
  
  useEffect(() => {
    load();
  }, []);

  function navigateTag(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/tags/${id}`);
    }
  }
  return (
    <>
      <Helmet>
        <title>Reviewton - Теги</title>
      </Helmet>
      <div className='page-header'>
        <h1>Теги</h1>
      </div>
      <div style={{
        'display': 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {tags.map(tag => 
          <div 
            tabIndex={0} 
            key={tag._id} 
            style={{
              display: 'flex'
            }}
            className='rounded'
            onClick={(e) => navigateTag(e, tag._id)} 
            onKeyDown={(e) => navigateTag(e, tag._id)}
          >
            <p
              style={{marginRight: '10px'}}
            >{tag.name}</p>

            {tag.articleCount}
          </div>)}
        {
          loadProcessing ? 
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
                  d="M512.056 908.647c-84.516 0-166.416-27.084-235.266-78.637-84.15-63.028-138.741-155.109-153.675-259.2-14.934-104.119 11.559-207.816 74.588-291.994 130.162-173.812 377.438-209.25 551.194-79.172 72.844 54.562 124.819 133.228 146.391 221.484 3.684 15.103-5.569 30.319-20.644 34.003-15.075 3.572-30.319-5.541-34.003-20.644-18.45-75.628-63-143.044-125.466-189.816-148.866-111.516-360.844-81.112-472.444 67.866-54.028 72.141-76.725 161.016-63.9 250.256 12.797 89.241 59.597 168.131 131.737 222.131 149.006 111.656 360.956 81.197 472.5-67.781 29.194-39.009 49.219-82.716 59.456-129.938 3.319-15.188 18.366-24.834 33.441-21.544 15.188 3.291 24.834 18.281 21.544 33.441-12.009 55.181-35.353 106.2-69.413 151.762-63.028 84.15-155.109 138.769-259.256 153.675-18.984 2.756-37.941 4.106-56.784 4.106z"  />
              </svg>
            </div> : null
        }
      </div>
    </>
  );
}
