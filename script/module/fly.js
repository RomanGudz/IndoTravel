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

const calcpositionFly = () => {
  const maxHeight = docElem.clientHeight - fly.clientHeight;
  const maxScroll = docElem.scrollHeight - docElem.clientHeight;
  const percentScroll = (window.scrollY * 100) / maxScroll;
  const height = maxHeight * (percentScroll / 100);
  console.log('height: ', percentScroll);
  fly.style.transform = `translateY(-${height}px)`;

  if (Math.round(height) === maxHeight) {
    console.log(fly.style.transform);
    fly.style.rotate = '180deg';
    fly.style.transform = `translateY(${height}px)`;
  }
  // if (fly.style.transform >= 0) {
  //   console.log('-1');
  //   fly.style.rotate = '180deg';
  //   fly.style.transform = `translateY(${height - maxHeight}px)`;
  // }
};
calcpositionFly()
document.body.append(fly);

window.addEventListener('scroll', () => {
  requestAnimationFrame(calcpositionFly);
  if (docElem.clientWidth < 758) {
    fly.remove();
  }
});