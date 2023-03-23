import '../index.css'
import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

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

  return (
    <div className="page">
      <div className="root">
          <Header/>
          <Main 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer/>

        <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input id="input-name" type="text" name="name" className="form__input" placeholder="Ваше имя" minLength="2" maxLength="40" required/>
          <span className="input-name-error input-error"></span>
          <input id="input-occupation" type="text" name="about" className="form__input" placeholder="Ваше занятие" minLength="2" maxLength="200" required/>
          <span className="input-occupation-error input-error"></span>
        </PopupWithForm>
        
        <PopupWithForm title="Новое место" name="add" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id="input-newPlace" type="text" name="name" className="form__input" placeholder="Название" minLength="2" maxLength="30" required/>
          <span className="input-newPlace-error  input-error"></span>
          <input id="input-link" type="url" name="link" className="form__input" placeholder="Ссылка на картинку" required/>
          <span className="input-link-error input-error"></span>
        </PopupWithForm>

        <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input id="input-avatar" type="url" name="avatar" className="form__input" placeholder="Ссылка на аватар" required/>
          <span className="input-avatar-error input-error"></span>
        </PopupWithForm>

        <PopupWithForm title="Вы уверены?" name="popup_delete" buttonText="Да">
          
        </PopupWithForm>

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard || {}} onClose={closeAllPopups}/>
      </div>
    </div>
  );
}

export default App;
