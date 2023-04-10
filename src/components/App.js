import '../index.css'
import {useState, useEffect} from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext'


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);

    const [currentUser,setCurrentUser] = useState({})

    useEffect(() => {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([User, initialCards]) => {
        setCurrentUser(User)

        setCards(initialCards); 
      })
      .catch((err) => {console.log(err)})
    }, [])

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeCardsLikeStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {console.log(err)});
  }

  function handleDeleteCard (card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter(
        (item)=> item._id !== card._id
        )
      )}
    )
    .catch( err => console.log(err))
  }

  function handleUpdateUser({name, about}) {
    api.editProfile({name, about})
    .then(({name, about}) => {
      setCurrentUser((user) => {
        return {...user, name, about}
      })
      closeAllPopups()
    })
    .catch( err => console.log(err))
  }

  function handleUpdateAvatar ({avatar}) {
    api.changeAvatar({avatar})
    .then(({avatar}) => {
      setCurrentUser((user) => {
        return {...user, avatar}
      })
      closeAllPopups()
    })
    .catch( err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    setCards([newCard, ...cards])
  }

  function handleAddCard ({name, link}) {
    api.addNewCard({name, link})
    .then((card) => {
      handleAddPlaceSubmit(card)
      closeAllPopups()
    })
    .catch( err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
            <Header/>
            <Main 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteCard={handleDeleteCard}
              cards={cards}
            />
            <Footer/>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>  

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>

          <PopupWithForm title="Вы уверены?" name="popup_delete" buttonText="Да">
            
          </PopupWithForm>

          <ImagePopup isOpen={isImagePopupOpen} card={selectedCard || {}} onClose={closeAllPopups}/>
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;