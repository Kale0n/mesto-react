import api from '../utils/Api.js'
import React from "react"
import Card from '../components/Card.js'

function Main(props) {

    let [userName, setUserName] = React.useState('')
    let [userDescription, setUserDescription] = React.useState('')
    let [userAvatar, setUserAvatar] = React.useState('')

    let [cards, setCards] = React.useState([])

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([UserData, initialCards])=> {
            setUserName(UserData.name);
            setUserDescription(UserData.about);
            setUserAvatar(UserData.avatar);

            setCards(initialCards);  
        })
        .catch((err) => {
            console.log(err);
        })
    })

    return (
    <div className="Main">
        <section className="profile">
            <div className="profile__avatar-container">
                <img className="profile__avatar" alt="Фото пользователя" src={userAvatar}/>
                <button name='popupButton' type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
                <div className="profile__name-container">
                    <h1 className="profile__name">{userName}</h1>
                    <button name='popupButton' type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__occupation">{userDescription}</p>
            </div>
            <button name='popupButton' type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>

        <section className="elements">
            { cards.map((card, index) => <Card onCardClick={props.onCardClick} card={card} key={index}/>)}
        </section>
    </div>   
    );
  }
  
export default Main;