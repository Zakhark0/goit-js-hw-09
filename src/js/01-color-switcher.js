const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let timerId = null;
const bodyEl = document.querySelector('body');
btnStopEl.disabled = true;

btnStartEl.addEventListener('click', () => {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;
  timerId = setInterval(() => {
    const colorEl = getRandomHexColor();
    bodyEl.style.backgroundColor = colorEl;
  }, 1000);
});

btnStopEl.addEventListener('click', () => {
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
});
btnStopEl.addEventListener('click', () => clearInterval(timerId));
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
