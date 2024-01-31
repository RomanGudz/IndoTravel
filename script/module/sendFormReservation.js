const URL = 'https://jsonplaceholder.typicode.com/posts';

const sendServer = (body, calback) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        calback(new Error(xhr.status), xhr.response);
        return;
      }
      const data = JSON.parse(xhr.response);
      calback(null, data)
    });
    xhr.addEventListener('error', () => {
      calback(new Error(xhr.status), xhr.response)
    });
    xhr.send(JSON.stringify(body));
  } catch (err) {
    calback(new Error(err));
  }
};

const form = document.querySelector('.reservation__form');
const totalPrice = document.querySelector('.reservation__price');
form.addEventListener('submit', e => {
  e.preventDefault();
  const target = e.target
  const formData = new FormData(target);
  formData.set('nameContact', target.reservation__name.value);
  formData.set('phoneContact', target.reservation__phone.value);
  formData.set('totalPrice', totalPrice.textContent);
  const newReservation = Object.fromEntries(formData);

  sendServer({
    title: target.children[0].textContent,
    body: newReservation,
  }, (err, data) => {
    if (err) {
      console.warn(err, data);
      form.textContent = `Ошибка отправки формы ${err}`;
      return
    }
    form.prepend(createModal(data.body.nameContact));
    // form.textContent = `Ваша заявка ${data.body.nameContact}, успешно отправлена`;
  })
  form.reset()
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
      footerForm.textContent = `Ошибка отправки формы ${err}`;
      return
    }
    footerForm.innerHTML = '';
    footerForm.append(createh2, createP);
  })
  footerForm.reset()
});

const createModal = (name) => {
  const containerDiv = document.createElement('div');
  const creeteDiv = document.createElement('div');
  const createH2 = document.createElement('h2');
  const createP = document.createElement('p');
  containerDiv.style = 'width: 100%; height: 100%; position: relative; z-index: 1000;';
  createH2.style = "width: 580px; left: 200px;  position: absolute; text-align: center; color: #303030; font-size: 34px; font-family: Merriweather; font-weight: 400; line-height: 51px; letter-spacing: 0.68px; word-wrap: break-word";
  createH2.textContent = 'Спасибо что выбрали нас.'
  creeteDiv.style = 'width: 980px; height: 309px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 30px; border: 1px #AFAFAF solid';
  createP.textContent = `Ваша заявка ${name}, успешно отправлена.`;
  createP.style = "width: 580px; left: 200px; top: 77px; position: absolute; text-align: center; color: #303030; font-size: 34px; font-family: Merriweather; font-weight: 400; line-height: 51px; letter-spacing: 0.68px; word-wrap: break-word";
  creeteDiv.append(createH2, createP);
  containerDiv.append(creeteDiv);
  return containerDiv;
};
