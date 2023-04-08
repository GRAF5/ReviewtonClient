import React from 'react';
import './star-rating.css';
import PropTypes from 'prop-types';

function StarRating({rating, style}) {
  const starsCount = [1, 2, 3, 4, 5];
  const listItems = starsCount.map((id) => <li className="star" key={id} value={id}>★</li>);

  function calcWidth() {
    let pers = (rating / 5) * 100;
    return pers + '%';
  }

  const topStyle = {
    width: calcWidth()
  };
  
  return (
    <ul style={style} className="star-rating">
      <div className="star-rating-top" style={topStyle}>
        {listItems}
      </div>
      <div className="star-rating-bottom">
        {listItems}
      </div>
    </ul>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
  style: PropTypes.object
};


export default StarRating;
