const docElem = document.documentElement;
const fly = document.createElement('div');

fly.style.cssText = `
position: fixed;
width: 50px;
height: 50px;
right: 0px;
bottom: 0px;
pointer-events: non;
rotate: 0deg;
background: url('img/airplane.svg') center/contain no-repeat;
`;
let flyВirection = false;
const calcpositionFly = () => {
  const maxHeight = docElem.clientHeight - fly.clientHeight;
  const maxScroll = docElem.scrollHeight - docElem.clientHeight;
  const percentScroll = (window.scrollY * 100) / maxScroll;
  const height = maxHeight * (percentScroll / 100);
  console.log('height: ', percentScroll);
  if (Math.round(percentScroll) === 100) {
    flyВirection = true;
  } else if (percentScroll === 0) {
    flyВirection = false;
  };
  if (flyВirection) {
    fly.style.rotate = '180deg';
    fly.style.transform = `translateY(${height}px)`;
  } else {
    fly.style.rotate = '0deg';
    fly.style.transform = `translateY(-${height}px)`;
  }
};
calcpositionFly()
document.body.append(fly);

window.addEventListener('scroll', () => {
  requestAnimationFrame(calcpositionFly);
  if (docElem.clientWidth < 758) {
    fly.remove();
  }
});