import modal from './modal.js';
const URL = 'https://jsonplaceholder.typicode.com/posts';

const sendServer = async (url, {
  method,
  calback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (calback) return calback(null, data);
      return;
    };
    throw new Error(response.statusText);
  } catch (err) {
    return calback(err);
  };
};

const form = document.querySelector('.reservation__form');
const totalPrice = document.querySelector('.reservation__price');
const reservationDate = document.querySelector('.reservation__data');
const buttonForm = document.querySelector('.reservation__button');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const target = e.target;
  const formData = new FormData(target);
  formData.set('nameContact', target.reservation__name.value);
  formData.set('phoneContact', target.reservation__phone.value);
  formData.set('totalPrice', totalPrice.textContent);
  const newReservation = Object.fromEntries(formData);
  if (target.classList.contains('reservation__form')) {
    const ShowModal = await modal(newReservation);
    if (ShowModal) {
      await sendServer(URL, {
        method: 'POST',
        body: {
          title: target.children[0].textContent,
          body: newReservation,
        },
        calback(err, data) {
          if (err) {
            falledMessage();
            console.warn(err, data);
          }
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      totalPrice.textContent = '';
      reservationDate.textContent = '';
      target.reservation__phone.value = '';
      target.reservation__name.value = '';
      target.reservation__date.value = '';
      target.reservation__people.value = '';
      showModal();
      target.reservation__phone.setAttribute('disabled', true);
      target.reservation__name.setAttribute('disabled', true);
      target.reservation__date.setAttribute('disabled', true);
      target.reservation__people.setAttribute('disabled', true);
      buttonForm.setAttribute('disabled', true);
    };
  };
});

const footerForm = document.querySelector('.footer__form');
const inputEmail = document.querySelector('.footer__input');
const createFooterMesage = () => {
  const createh2 = document.createElement('h2');
  const createP = document.createElement('p');
  createh2.classList.add('footer__title', 'footer__form-title');
  createh2.textContent = 'Ваша заявка успешно отправлена';
  createP.classList.add('footer__text');
  createP.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';

  return { createh2, createP };
};

footerForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = inputEmail.value
  const { createh2, createP } = createFooterMesage();
  sendServer({
    title: 'Вопросы по туру',
    body: email,
  }, (err, data) => {
    if (err) {
      console.warn(err, data);
      form.textContent = `Ошибка отправки формы ${err}`;
      return;
    }
    footerForm.innerHTML = '';
    footerForm.append(createh2, createP);
  })
  footerForm.reset();
});

const showModal = () => {
  form.insertAdjacentHTML('beforebegin', `<div style="width: 100%; height: 100%; position: relative; z-index: 1;" id="modal">
      <div
        style="width: 980px; height: 509px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 30px; border: 1px #AFAFAF solid">
      </div>
      <div
        style="width: 580px; left: 200px; top: 77px; position: absolute; text-align: center; color: #303030; font-size: 34px; font-family: Merriweather; font-weight: 400; line-height: 51px; letter-spacing: 0.68px; word-wrap: break-word">
        Ваша заявка успешно отправлена</div>
      <div style="width: 100px; height: 100px; left: 440px; top: 310px; position: absolute">
        <div
          style="width: 100px; height: 100px; left: 0px; top: 0px; position: absolute; background: #78EC6E; border-radius: 9999px">
        </div>
        <div style="width: 61.90px; height: 61.90px; left: 19.05px; top: 19.05px; position: absolute">
          <div style="width: 61.90px; height: 61.90px; left: 0px; top: 0px; position: absolute"></div>
          <div
            style="width: 45.40px; height: 34.56px; left: 8.77px; top: 14.44px; position: absolute; background: white">
          </div>
        </div>
      </div>
      <div
        style="left: 211px; top: 219px; position: absolute; color: #303030; font-size: 18px; font-family: Nunito; font-weight: 700; line-height: 27px; word-wrap: break-word">
        Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</div>
    </div>`);
  setTimeout(function () { hideModal() }, 3000);
};
const hideModal = () => {
  const modal = document.querySelector('#modal');
  modal.style.display = 'none';
};

const falledMessage = () => {
  form.insertAdjacentHTML('beforebegin', `<div style="width: 100%; height: 100%; position: relative; z-index: 1;" id="modalError">
    <div style="width: 980px; height: 509px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 30px; border: 1px #AFAFAF solid"></div>
    <div style="width: 580px; left: 200px; top: 77px; position: absolute; text-align: center; color: #303030; font-size: 34px; font-family: Merriweather; font-weight: 400; line-height: 51px; letter-spacing: 0.68px; word-wrap: break-word">Упс... Что-то пошло не так</div>
    <div style="left: 171px; top: 168px; position: absolute; color: #303030; font-size: 18px; font-family: Nunito; font-weight: 700; line-height: 27px; word-wrap: break-word">Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз</div>
    <div style="width: 360px; height: 76px; left: 310px; top: 259px; position: absolute">
        <div style="width: 360px; height: 76px; left: 0px; top: 0px; position: absolute; background: #FCB500; border-radius: 12px"></div>
        <button style="left: 111px; top: 24px; position: absolute; color: white; font-size: 18px; font-family: Nunito; font-weight: 700; line-height: 27px; word-wrap: break-word" id="closeModal">Забронировать</button>
    </div>
</div>`);
  const closeModal = document.querySelector('#closeModal');
  closeModal.addEventListener('click', () => {
    const modal = document.querySelector('#modalError');
    modal.style.display = 'none';
  });
};


