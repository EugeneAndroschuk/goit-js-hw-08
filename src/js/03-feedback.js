import throttle from 'lodash.throttle';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');

form.addEventListener('input', throttle(() => onInput(), 500));
form.addEventListener('submit', onSubmit);

fillForm();

function onInput() {
  formData.email = emailEl.value;
  formData.message = messageEl.value;

  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (err) {
    console.error(err);
  }
}

function onSubmit(e) {
  e.preventDefault();
  formData.email = emailEl.value;
  formData.message = messageEl.value;
  console.log('Текущее значение объекта при Submit', formData);
  form.reset();
  localStorage.removeItem('feedback-form-state');
}

function fillForm() {
  try {
    const formDataUnparsed = localStorage.getItem('feedback-form-state');
    const formDataSaved = JSON.parse(formDataUnparsed);
    if (formDataSaved !== null) {
      emailEl.value = formDataSaved.email;
      messageEl.value = formDataSaved.message;
    }
  } catch (err) {
    console.error(err);
  }
}
