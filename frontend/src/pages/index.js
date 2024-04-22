//Импорт главного файла стилей.
import '../pages/index.css';


//Импорт данных из других модулей.
import {
  avatarEditButton,
  profileEditButton,
  cardAddButton,
  avatarEditForm,
  profileEditForm,
  cardAddForm,
  validationOptions,
  configData
} from '../utils/constants.js'

import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import PopupWithImage from '../components/PopupWithImage';



const allFetches = new Api(configData);
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  aboutUserSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});
const cardList = new Section({
  items: [],
  renderer: (cardItem) => {
    const cardData = {
      title: cardItem.name,
      imageSrc: cardItem.link,
      id: cardItem._id,
      likesArray: cardItem.likes,
      cardOwnerId: cardItem.owner._id
    };

    const cardElement = createCard(cardData);

    cardList.addItem(cardElement);
  }
},
  '.elements');



//Функция создания нового элемента карточки.
//Возвращает полностью готовую разметку карточки.
function createCard(cardData) {
  const card = new Card({
    data: cardData,
    handleCardClick: () => {
      previewPopup.open(cardData.imageSrc, cardData.title);
    },
    handleLikeClick: (queryMethod) => {
      allFetches.changeLikesData(cardData.id, queryMethod)
        .then((result) => {
          //Обновляем отображение статуса лайка (проставлен/нет) и значение счетчика лайков в карточке (на клиенте).
          card.toggleLikeButtonActivity();
          card.renderLikesCount(result.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteClick: () => {
      sessionStorage.setItem('deletedCardId', cardData.id);
      deleteConfirmPopup.open();
    }
  }, '#card-template');

  return card.generateCard(userInfo.getUserInfo().userId);
}


//Активация валидации форм.
const avatarEditFormValidator = new FormValidator(validationOptions, avatarEditForm);
const profileEditFormValidator = new FormValidator(validationOptions, profileEditForm);
const cardAddFormValidator = new FormValidator(validationOptions, cardAddForm);

avatarEditFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();



//Подгрузка и отображение на странице данных профиля текущего пользователя и массива карточек по умолчанию.
Promise.all([allFetches.getProfileData(), allFetches.getInitialCards()])
  .then(([profileData, initialCardsData]) => {
    //Отрисовываем данные профиля текущего пользователя.
    userInfo.setUserInfo(profileData);

    //Отрисовываем массив карточек по умолчанию.
    cardList.renderItems(initialCardsData);
  })
  .catch((err) => {
    console.log(err);
  });



//Попап редактирования аватарки.
const avaEditPopup = new PopupWithForm('.popup_type_avatarEdit',
  (evt, inputsValue) => {
    evt.preventDefault();

    avaEditPopup.renderLoading(true);

    //Сохраняем отредактированные данные на сервере...
    allFetches.editAvatarData({ avatar: inputsValue.avatarSrc })//_getIputValues
      .then((result) => {
        //... а затем - на клиенте.
        userInfo.setUserInfo(result);
        avaEditPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avaEditPopup.renderLoading(false, 'Сохранить');
      });
  },
  () => { });

avaEditPopup.setEventListeners();



//Попап редактирования данных профиля.
const profileEditPopup = new PopupWithForm('.popup_type_profileEdit',
  (evt, inputsValue) => {
    evt.preventDefault();

    profileEditPopup.renderLoading(true);

    //Сохраняем отредактированные данные на сервере...
    allFetches.editProfileData({ name: inputsValue.userName, about: inputsValue.aboutUser })
      .then((result) => {
        //... а затем - на клиенте.
        userInfo.setUserInfo(result);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileEditPopup.renderLoading(false, 'Сохранить');
      });
  },
  () => {
    const data = userInfo.getUserInfo();
    profileEditPopup.setInputValues(data);
  });

profileEditPopup.setEventListeners();



//Попап добавления карточки.
const cardAddPopup = new PopupWithForm('.popup_type_cardAdd',
  (evt, inputsValue) => {
    evt.preventDefault();

    cardAddPopup.renderLoading(true);

    //Сохраняем данные карточки на сервере.
    const newCardData = {
      name: inputsValue.cardName,
      link: inputsValue.cardSrc
    };

    allFetches.addNewCard(newCardData)
      .then((result) => {
        //Добавляем карточку на страницу.
        cardList.renderItems([result]);

        cardAddPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardAddPopup.renderLoading(false, 'Создать');
      });
  },
  () => { });
cardAddPopup.setEventListeners();



//Попап просмотра изображения карточки.
const previewPopup = new PopupWithImage('.popup_type_imagePreview');
previewPopup.setEventListeners();



const deleteConfirmPopup = new PopupWithDelete('.popup_type_deleteConfirm',
  (evt) => {
    evt.preventDefault();
    //Функция отображает процесс загрузки данных в модальных окнах.
    deleteConfirmPopup.renderLoading(true, 'Удаление...');
    const deletedCardId = sessionStorage.getItem('deletedCardId');

    //Удаляем карточку на сервере.
    allFetches.removeCard(deletedCardId)
      .then((result) => {
        //Удаляем карточку на клиенте.
        document.getElementById(deletedCardId).remove();
        deleteConfirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteConfirmPopup.renderLoading(false, 'Да');
      });
  });

deleteConfirmPopup.setEventListeners();


//Назначение обработчиков событий для элементов интерфейса.
avatarEditButton.addEventListener('click', () => {
  avaEditPopup.prefillForm();
  avatarEditFormValidator.resetValidation();
  avaEditPopup.open();
});
profileEditButton.addEventListener('click', () => {
  profileEditPopup.prefillForm();
  profileEditFormValidator.resetValidation();
  profileEditPopup.open();
});
cardAddButton.addEventListener('click', () => {
  cardAddPopup.prefillForm();
  cardAddFormValidator.resetValidation();
  cardAddPopup.open();
});
