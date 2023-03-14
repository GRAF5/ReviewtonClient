import './star-rating.css';

function StarRating({rating}){
    const starsCount = [1, 2, 3, 4, 5];
    const listItems = starsCount.map((id) => <li className="star" key={id} value={id}>★</li>);

    function calcWidth(){
        var pers = (rating/5)*100;
        return pers + "%";
    }

    const topStyle ={
        width: calcWidth()
    };
    
    return(
        <ul className="star-rating">
            <div className="star-rating-top" style={topStyle}>
                {listItems}
            </div>
            <div className="star-rating-bottom">
                {listItems}
            </div>
        </ul>
    )
}

export default StarRating;