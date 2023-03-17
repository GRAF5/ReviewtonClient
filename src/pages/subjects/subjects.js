import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { contentClient } from '../../clients/content.client';
import StarRating from '../../components/star-rating/star-rating';

export default function Subjects({...props}) {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    contentClient.getSubjects()
      .then(res => setSubjects(res.subjects));
  }, []);

  function navigateSubject(e, id) {
    if (!e.key || e.key === 'Enter') {
      navigate(`/subjects/${id}`)
    }
  }
  return(
    <>
      <div className='page-header'>
        <h1>Теми</h1>
      </div>
      <div style={{
        'display': 'flex',
        flexWrap: 'wrap'
      }}>
        {subjects.map(sub => <div 
              tabIndex={0} 
              key={sub._id} 
              className='rounded' 
              onClick={(e) => navigateSubject(e, sub._id)} 
              onKeyDown={(e) => navigateSubject(e, sub._id)}>
                {sub.name}
                <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}><StarRating rating={sub.rating} />&nbsp;<p>{sub.articleCount}</p></div>
            </div>)}
      </div>
    </>
  )
}