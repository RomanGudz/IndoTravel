

const timerPage = () => {
  const deadline = document.querySelector('.hero__timer');
  deadline.setAttribute('data-timer-deadline', '2024/01/25 22:31')
  const getDeadline = deadline.getAttribute('data-timer-deadline');
  const discountText = document.querySelector('.hero__text')
  const timerDay = document.getElementsByClassName('timer__item_days');
  const timerHours = document.getElementsByClassName('timer__item_hours');
  const timerMinutes = document.getElementsByClassName('timer__item_minutes');
  const timer = () => {
    const dateStop = () => {
      const date = new Date(getDeadline).getTime();
      const timeZone = (new Date(getDeadline).getTimezoneOffset() / 60) + 3
      if (0 === timeZone) {
        return date
      } else {
        console.log(timeZone);
        return ((1000 * 60 * 60) * timeZone) + date;
      }
    };
    const dateNow = Date.now();
    const stopTimer = dateStop() - dateNow;

    const days = Math.floor(stopTimer / 1000 / 60 / 60 / 24);
    const hours = Math.floor(stopTimer / 1000 / 60 / 60 % 24);
    const minutes = Math.floor(stopTimer / 1000 / 60 % 60);
    const seconds = Math.floor(stopTimer / 1000 % 60)
    return { stopTimer, days, hours, minutes, seconds }
  };

  const dayTitle = number => {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) {
      return 'дней';
    };
    const lastnumber = number % 10;
    if (lastnumber == 1) {
      return 'день';
    };
    if ([2, 3, 4].includes(lastnumber)) {
      return 'дня';
    };
    if ([5, 6, 7, 8, 9, 0].includes(lastnumber)) {
      return 'дней';
    };
  }
  const hourTitle = number => {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) {
      return 'часов';
    };
    const lastnumber = number % 10;
    if (lastnumber === 1) {
      return 'час'
    };
    if ([2, 3, 4].includes(lastnumber)) {
      return 'часа';
    }
    if ([5, 6, 7, 8, 9, 0].includes(lastnumber)) {
      return 'часов';
    }
  };
  const minuteTitle = number => {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) {
      return 'минут';
    };
    const lastnumber = number % 10;
    if (lastnumber === 1) {
      return 'минута'
    };
    if ([2, 3, 4].includes(lastnumber)) {
      return 'минуты';
    }
    if ([5, 6, 7, 8, 9, 0].includes(lastnumber)) {
      return 'минут';
    }
  };
  const secondTitile = number => {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) {
      return 'секунд';
    };
    const lastnumber = number % 10;
    if (lastnumber === 1) {
      return 'секунда'
    };
    if ([2, 3, 4].includes(lastnumber)) {
      return 'секунды';
    }
    if ([5, 6, 7, 8, 9, 0].includes(lastnumber)) {
      return 'секунд';
    }
  };

  const controlNumber = number => {
    if (number > 10) {
      return number
    } else {
      return `0${number}`
    }
  };
  const start = () => {
    const startTimer = timer();
    timerDay[0].children[0].textContent = controlNumber(startTimer.days);
    timerDay[0].children[1].textContent = dayTitle(startTimer.days);
    timerHours[0].children[0].textContent = controlNumber(startTimer.hours);
    timerHours[0].children[1].textContent = hourTitle(startTimer.hours);
    timerMinutes[0].children[0].textContent = controlNumber(startTimer.minutes);
    timerMinutes[0].children[1].textContent = minuteTitle(startTimer.minutes);
    const counterTimer = setTimeout(start, 1000)
    if (startTimer.stopTimer <= 0) {
      clearTimeout(counterTimer);
      deadline.remove()
      discountText.remove()
    }
    if (startTimer.days < 1) {
      timerDay[0].children[0].textContent = controlNumber(startTimer.hours)
      timerDay[0].children[1].textContent = hourTitle(startTimer.hours);;
      timerHours[0].children[0].textContent = controlNumber(startTimer.minutes);
      timerHours[0].children[1].textContent = minuteTitle(startTimer.minutes);
      timerMinutes[0].children[0].textContent = controlNumber(startTimer.seconds);
      timerMinutes[0].children[1].textContent = secondTitile(startTimer.seconds);
    }
  }

  start()
};

timerPage();