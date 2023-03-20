function PopupWithForm (props) {
    return(
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <form name={`form-${props.name}`} className="form" noValidate>
            <h3 className="popup__heading">{props.title}</h3>
            <fieldset name={`${props.name}-field-set`} className="form__input-container">
                {props.children}
                <button type="submit" name="saveButton" className="form__save-button">{props.buttonText}</button>
            </fieldset>
            <button name="closeButton" type="button" className="popup__close-button" onClick={props.onClose}></button>
        </form>
    </div>
    )
}

export default PopupWithForm;