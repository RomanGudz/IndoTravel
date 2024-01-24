const createTimer = (div) => {
  div.insertAdjacentHTML('beforeend', `
    <p class="timer__title">До конца акции осталось:</p><p class="timer__item timer__item_days">
      <span class="timer__count timer__count_days"></span>
      <span class="timer__units timer__units_days"></span>
    </p><p class="timer__item timer__item_hours">
        <span class="timer__count timer__count_hours"></span>
        <span class="timer__units timer__units_hours"></span>
      </p><p class="timer__item timer__item_minutes">
        <span class="timer__count timer__count_minutes"></span>
        <span class="timer__units timer__units_minutes"></span>
      </p></>`);

  return div;
}

export default {
  createTimer,
}