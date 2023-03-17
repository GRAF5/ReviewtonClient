import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { contentClient } from '../../clients/content.client';

export default function Tags({...props}) {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    contentClient.getTags()
      .then(res => setTags(res.tags));
  }, []);

  function navigateTag(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/tags/${id}`)
    }
  }
  return(
    <>
      <div className='page-header'>
        <h1>Теги</h1>
      </div>
      <div style={{
        'display': 'flex',
        flexWrap: 'wrap'
      }}>
        {tags.map(tag => <div 
              tabIndex={0} 
              key={tag._id} 
              className='rounded' 
              onClick={(e) => navigateTag(e, tag._id)} 
              onKeyDown={(e) => navigateTag(e, tag._id)}>
                {tag.name}
                {tag.articleCount}
            </div>)}
      </div>
    </>
  )
}