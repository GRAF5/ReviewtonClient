import './InputStarRating.css';

function InputStarRating({rating, handleClick}){
    const starsCount = [1, 2, 3, 4, 5];
    
    const listItems = starsCount.map((id) => id<=rating ? <li onClick={handleClick} className="input-star checked" key={id} value={id}>★</li>
                                                        : <li onClick={handleClick} className="input-star" key={id} value={id}>★</li>);

    return(
        <ul className="input-star-rating-list">
            {listItems}
        </ul>
    )
}

export default InputStarRating;