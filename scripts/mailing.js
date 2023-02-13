const mailingInput = document.querySelector('.mailing__input-email');
const mailingOkBtn = document.querySelector('.mailing__send-button');

mailingInput.oninput = function () {
  mailingOkBtn.classList.add('mailing__send-button_active');
}

mailingOkBtn.addEventListener('click', (event) => {
  event.preventDefault();
  mailingInput.value = 'Круто!';
  mailingInput.focus();
  mailingOkBtn.classList.remove('mailing__send-button_active');
});

