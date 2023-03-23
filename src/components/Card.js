function Card ({onCardClick, card}) {
    function handleClick() {
        onCardClick(card);
    }  

    return (
        <div className="element">
            <button name='popupButton' type="button" className="element__photo-button" onClick={handleClick}>
                <img className="element__photo" src={card.link} alt={card.name}/>
            </button>
            <button type="button" className="element__delete-button"></button>
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className="element__like-button"></button>
                    <div className="element__counter">{card.likes.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Card