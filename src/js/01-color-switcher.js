const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let timerId = null;

stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBackgroundColor() {
  body.style.background = getRandomHexColor();
}

function handleStartClick() {
  timerId = setInterval(changeBackgroundColor, 1000);
  //   console.log(timerId);
  startButton.disabled = true;
  stopButton.disabled = false;
  return timerId;
}

function handleStopClick() {
  clearInterval(timerId);
  //   console.log(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', handleStartClick);
stopButton.addEventListener('click', handleStopClick);
