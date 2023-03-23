import api from '../utils/Api.js'
import {useState, useEffect} from "react"
import Card from '../components/Card.js'

function Main(props) {

    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    const [cards, setCards] = useState([])

    useEffect(() => {
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
    }, [])

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
            { cards.map((card) => <Card onCardClick={props.onCardClick} card={card} key={card._id}/>)}
        </section>
    </div>   
    );
  }
  
export default Main;