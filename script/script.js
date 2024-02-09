import createElement from './module/createElement.js';
import timer from './module/timer.js';
import './module/accordion.js';
import './module/headerMenu.js';
import './module/fly.js';
import './module/dbBase.js';
import './module/sendFormReservation.js';

const {
  timerPage,
} = timer;

new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 4000
  },
  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    scale: 1,
    slideShadows: true,
  },
});

const {
  createTimer,
} = createElement;
{
  const timerPlagin = (divTimer) => {
    createTimer(divTimer);
    timerPage();
  };
  window.ToDo = timerPlagin;
}