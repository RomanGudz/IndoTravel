const btnHeaderMenu = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const itemsMenu = document.querySelectorAll('.header__item');

// btnHeaderMenu.addEventListener('click', () => {
//   headerMenu.classList.toggle('header__menu_active');
// });
// itemsMenu.forEach(item => {
//   item.addEventListener('click', () => {
//     headerMenu.classList.toggle('header__menu_active');
//   })
// })

document.addEventListener('click', (event) => {
  const isMenuClicked = headerMenu.contains(event.target);
  const isButtonClicked = btnHeaderMenu.contains(event.target);

  if (!isMenuClicked && !isButtonClicked) {
    headerMenu.classList.toggle('header__menu_active');
  } else {
    headerMenu.classList.toggle('header__menu_active');
  }
});
