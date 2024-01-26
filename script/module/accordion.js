const items = document.querySelectorAll('.travel__item');
const itemsTitleBtn = document.querySelectorAll('.travel__item-title');
const textWrapper = document.querySelectorAll('.travel__item-text-wrapper');
let heightWrapper = 0
textWrapper.forEach(elem => {
  if (heightWrapper < elem.scrollHeight) {
    heightWrapper = elem.scrollHeight;
  }
})

itemsTitleBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    items.forEach((_, idx) => {
      if (index === idx) {
        textWrapper[idx].style.height = items[idx].classList.contains('travel__item_active') ?
          '' : `${heightWrapper}px`;
        items[idx].classList.toggle('travel__item_active');
      } else {
        textWrapper[idx].style.height = '';
        items[idx].classList.remove('travel__item_active');
      }
    })
  });
});