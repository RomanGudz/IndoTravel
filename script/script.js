import createElement from './module/createElement.js';
import timer from './module/timer.js';

const {
  timerPage,
} = timer;

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