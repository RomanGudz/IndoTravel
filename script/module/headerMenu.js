const btnHeaderMenu = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const itemsMenu = document.querySelectorAll('.header__item');

let startTime = NaN;
const duretionOpacity = 300;

document.addEventListener('click', (event) => {
  const isMenuClicked = headerMenu.contains(event.target);
  const isButtonClicked = btnHeaderMenu.contains(event.target);

  if (!isMenuClicked && !isButtonClicked) {
    headerMenu.classList.toggle('header__menu_active');
  } else {
    requestAnimationFrame(animationMenu)
    headerMenu.classList.toggle('header__menu_active');
  }
});

headerMenu.style.cssText = `
opacity: 0;
`;

const animationMenu = (timestamp) => {
  startTime ||= timestamp;
  const progress = (timestamp - startTime) / duretionOpacity;

  headerMenu.style.opacity = progress + 0.05;
  console.log('headerMenu: ', headerMenu);
  if (progress < 1) {
    requestAnimationFrame(animationMenu);
  }
};
