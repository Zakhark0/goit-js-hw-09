// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
const valueDaysEl = document.querySelector('[data-days]');
const valueHoursEl = document.querySelector('[data-hours]');
const valueMinutesEl = document.querySelector('[data-minutes]');
const valueSecondsEl = document.querySelector('[data-seconds]');

const startBtnEl = document.querySelector('[data-start]');
startBtnEl.disabled = true;

let date = null;
let dateNow = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    now = new Date();
    if (selectedDates[0].getTime() < Date.now()) {
      alert('Виберіть майбутню дату');
      startBtnEl.disabled = true;
      return;
    } else {
      startBtnEl.disabled = false;
      const setTimer = () => {
        date = selectedDates[0].getTime();
        timer.counts();
      };

      startBtnEl.addEventListener('click', setTimer);
    }
  },
};

flatpickr('#datetime-picker', options);

function pad(value) {
  return String(value).padStart(2, '0');
}
const timer = {
  timerId: null,
  isActive: false,
  counts() {
    this.timerId = setInterval(() => {
      startBtnEl.disabled = true;
      dateNow = Date.now();
      const gap = date - dateNow;
      console.log(this.convertMs(gap));
      if (gap <= 1) {
        clearInterval(this.timerId);
        startBtnEl.disabled = true;
        console.log(this.timerId);
        alert('Таймер завершив відлік');
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(gap);
      valueDaysEl.textContent = `${days}`;
      valueHoursEl.textContent = `${hours}`;
      valueMinutesEl.textContent = `${minutes}`;
      valueSecondsEl.textContent = `${seconds}`;
    }, 1000);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  },
};
