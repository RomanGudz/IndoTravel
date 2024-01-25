const btnHeaderMenu = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const itemsMenu = document.querySelectorAll('.header__item');
const main = document.querySelector('.section');

btnHeaderMenu.addEventListener('click', () => {
  headerMenu.classList.toggle('header__menu_active');
});
itemsMenu.forEach(item => {
  item.addEventListener('click', () => {
    headerMenu.classList.toggle('header__menu_active');
  })
})

