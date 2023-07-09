import { Notify } from 'notiflix/build/notiflix-notify-aio';
const options = {
  width: '800px',
  fontSize: '18px',
  position: 'center-bottom',
  distance: '33px',
  borderRadius: '8px',
  timeout: 12000,
  clickToClose: true,
  cssAnimationStyle: 'from-top',
};

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', addSubmitForm);

function addSubmitForm(e) {
  e.preventDefault();
  let FIRST_DELAY = Number(e.target.delay.value);
  const DELAY_STEP = Number(e.target.step.value);
  const AMOUNTS_TIMES = Number(e.target.amount.value);

  for (let position = 1; position <= AMOUNTS_TIMES; position += 1) {
    createPromise(position, FIRST_DELAY)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, options);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, options);
      });
    FIRST_DELAY += DELAY_STEP;
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resovle(objectPromise);
      } else {
        reject(objectPromise);
      }
    }, delay);
  });
}
