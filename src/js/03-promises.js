//imports

import { Notify } from 'notiflix/build/notiflix-notify-aio';

//selectors
const refs = {
  form: document.querySelector('.form'),
  labels: document.querySelectorAll('label'),
  inputs: document.querySelectorAll('input'),
};

//inline styles

refs.labels.forEach(label => {
  label.style.display = 'inline-block';
});
refs.inputs.forEach(input => {
  input.style.display = 'block';
});

//functions

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const startDelay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  for (let position = 1; position <= amount; position++) {
    const delay = startDelay + (position - 1) * step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    form.reset();
  }
}

refs.form.addEventListener('submit', handleSubmit);