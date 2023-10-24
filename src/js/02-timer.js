

import { Notify } from 'notiflix/build/notiflix-notify-aio';



const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');
const clockDays = document.querySelector('span[data-days]');
const clockHours = document.querySelector('span[data-hours]');
const clockMinutes = document.querySelector('span[data-minutes]');
const clockSeconds = document.querySelector('span[data-seconds]');



timer.style.display = 'flex';
timer.style.gap = '20px';
timer.style.paddingTop = '20px';

labels.forEach(label => {
  label.style.display = 'block';
  label.style.textTransform = 'uppercase';
  label.style.fontWeight = '700';
  label.style.fontSize = '10px';
  label.style.textAlign = 'center';
});
values.forEach(value => {
  value.style.display = 'block';
  value.style.fontSize = '30px';
  value.style.textAlign = 'center';
});

let selectedDateTimestamp = null;
let selectedDateIsOk = null;
let intervalID = null;

startButton.disabled = true;



function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = addLeadingZero(Math.floor(ms / day));
 
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
 
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  clockDays.textContent = `${days}`;
  clockHours.textContent = `${hours}`;
  clockMinutes.textContent = `${minutes}`;
  clockSeconds.textContent = `${seconds}`;
}

function checkSelectedDate(DateTime) {
  countdown.stop(intervalID);
  selectedDateTimestamp = DateTime.getTime();
  if (selectedDateTimestamp > Date.now()) {
    startButton.disabled = false;
    return (selectedDateIsOk = true);
  } else {
    Notify.failure('Please choose a date in the future');
    console.log('Error: Please choose a date in the future');
    return;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    checkSelectedDate(selectedDates[0]);
  },
};

const countdown = {
  start() {
    startButton.disabled = true;
    console.log('Countdown is started');
    intervalID = setInterval(() => {
      const currentTimestamp = Date.now();
      if (selectedDateIsOk) {
        updateClockface(convertMs(selectedDateTimestamp - currentTimestamp));
        if (selectedDateTimestamp - currentTimestamp <= 1000) {
          countdown.stop(intervalID);
          Notify.success('Countdown completed!');
          console.log('Countdown completed!');
        }
      }
    }, 1000);
  },
  stop(id) {
    clearInterval(id);
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', countdown.start);