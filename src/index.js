const hamburger = document.querySelector('.hamburger'),
  menu = document.querySelector('.menu'),
  closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
  menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
  menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
  lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
  lines[i].style.width = item.innerHTML;
});


const usernameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const form = document.querySelector('#signup');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();

  let isFormValid = isUsernameValid && isEmailValid;

  if (isFormValid) {

  }

});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay);
  };
};

form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'name':
      checkUsername();
      break;
    case 'email':
      checkEmail();
      break;
  }
}));



const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (input, message) => {

  const formField = input.parentElement;

  formField.classList.remove('success');
  formField.classList.add('error');

  const error = formField.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {

  const formField = input.parentElement;


  formField.classList.remove('error');
  formField.classList.add('success');


  const error = formField.querySelector('small');
  error.textContent = '';
}

const checkUsername = () => {

  let valid = false;
  const min = 3;
  const max = 25;
  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, 'Введите имя!');
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameEl, `Имя может состоять от ${min} до ${max} букв.`)
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
}

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, 'Поле не может быть пустым!');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'Невалидный адрес почты!')
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
}

