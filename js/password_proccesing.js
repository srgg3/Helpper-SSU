function togglePassword() {
  const input = document.getElementById('password');
  const icon  = document.getElementById('eye-icon');
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';
  icon.innerHTML = show
    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
}

function validatePassword(value) {
  // Сюда добавляй свои условия
  if (value.length === 0) return '';             
  if (value.length < 6)   return 'Minimum 6 symbols';
  if (!/[A-Z]/.test(value)) return 'At least one capital letter';
  if (!/[0-9]/.test(value)) return 'At list one digit';
  if (!/[()!@#$%^&*]/.test(value)) return 'At least one symbol from this - ()!@#$%^&*';
  return ''; // всё ок
}

function showErrorPsw() {
  const input = document.getElementById('password');
  const error = document.getElementById('password-error');
  const msg = validatePassword(input.value);
  error.textContent = msg;

  // подсвечиваем поле красным если есть ошибка
  input.style.borderColor = msg ? 'rgba(220,80,80,0.7)' : '';
}

document.getElementById('password').addEventListener('input', showErrorPsw);