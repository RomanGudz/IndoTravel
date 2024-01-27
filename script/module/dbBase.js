const LoadData = async (calback) => {
  const result = await fetch('http://127.0.0.1:5500/date.json');
  const data = await result.json();
  calback(data);
};

const reservationDate = document.getElementById('reservation__date');
const reservationPeople = document.getElementById('reservation__people');

const selectReservation = (data) => {
  const form = document.querySelector('.reservation__form');
  const reservationInfo = document.querySelector('.reservation__info');
  optionsDate(data);

  form.reservation__date.addEventListener('change', e => {
    const target = e.target;
    changePeople(target, data);
    reservationInfo.children[0].textContent = `${target.value}`;
  });
  form.reservation__people.addEventListener('change', e => {
    const target = e.target;
    const people = target.value > 4 ? 'человек' : 'человека';
    reservationInfo.children[0].textContent = `${reservationDate.value}, ${target.value} ${people}`;
    const findDate = data.find(elem => elem.date === reservationDate.value);
    reservationInfo.children[1].textContent = `${target.value * findDate.price} ₽`;
  })
};

const optionsDate = (data) => {
  const option = data.map(element => {
    const optionReservationDate = document.createElement('option');
    optionReservationDate.classList.add('tour__option', 'reservation__option');
    optionReservationDate.textContent = element.date;
    optionReservationDate.value = element.date;
    return optionReservationDate;
  });
  reservationDate.append(...option);
};

const changePeople = (target, data) => {
  const findDate = data.find(elem => elem.date === target.value);
  reservationPeople.innerHTML = '';
  const minPeople = findDate["min-people"];
  const maxPeople = findDate["max-people"];

  const array = Array.from({ length: maxPeople - minPeople + 1 }, (_, index) => minPeople + index);

  const peopleOptions = array.map(value => {
    const optionReservationPeople = document.createElement('option');
    optionReservationPeople.classList.add('tour__option', 'reservation__option');
    optionReservationPeople.text = value;

    return optionReservationPeople;
  });

  reservationPeople.insertAdjacentHTML('afterbegin', `
  <option value="" class="tour__option reservation__option">Количество человек</option>`);
  reservationPeople.append(...peopleOptions);
};

LoadData(selectReservation)