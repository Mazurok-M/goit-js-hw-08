import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('.feedback-form input');
const messageEl = document.querySelector('.feedback-form textarea');

formEl.addEventListener('input', throttle(onInputFormChange, 500));
formEl.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';

const formData = {};


gettingFormData();

function onInputFormChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function gettingFormData() {
  const parsedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY));

  console.log(parsedSettings);

  if (parsedSettings) {
    emailEl.value = parsedSettings.email;
    messageEl.value = parsedSettings.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  event.target.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
}
