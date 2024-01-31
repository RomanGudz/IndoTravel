import loadStyle from './loadStyle.js';

const modal = async (data) => {
  await loadStyle('css/modal.css');
  const people = data.people > 4 ? 'человек' : 'человека';
  const overlayDiv = document.createElement('div');
  const modalDiv = document.createElement('div');
  const h2 = document.createElement('h2');
  const reservationP = document.createElement('p');
  const dateP = document.createElement('p');
  const priceP = document.createElement('p');
  const buttonDiv = document.createElement('div');
  const btnConfirm = document.createElement('button');
  const btnEdit = document.createElement('button');
  overlayDiv.classList.add('overlay', 'overlay_confirm');
  modalDiv.classList.add('modal');
  h2.classList.add('modal__title');
  h2.textContent = 'Подтверждение заявки';
  reservationP.classList.add('modal__text');
  reservationP.textContent = `Бронирование путешествия в Индию на ${data.people} ${people}`;
  dateP.classList.add('modal__text');
  dateP.textContent = `В даты: ${data.dates}`;
  priceP.classList.add('modal__text');
  priceP.textContent = `Стоимость тура ${data.totalPrice}`;
  buttonDiv.classList.add('modal__button');
  btnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  btnConfirm.textContent = 'Подтверждаю';
  btnEdit.classList.add('modal__btn', 'modal__btn_edit');
  btnEdit.textContent = 'Изменить данные';
  buttonDiv.append(btnConfirm, btnEdit);
  modalDiv.append(h2, reservationP, dateP, priceP, buttonDiv);
  overlayDiv.append(modalDiv);
  document.body.append(overlayDiv);
  return new Promise((resolve) => {
    btnConfirm.addEventListener('click', () => {
      overlayDiv.remove();
      resolve(true);
    });

    btnEdit.addEventListener('click', () => {
      overlayDiv.remove();
      resolve(false);
    });
  });
};

export default modal;