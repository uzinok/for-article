const button = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');

nav.classList.remove('nav--no-js');

function handleCloseEvents(event) {
  if (!nav.contains(event.target) || event.target.closest('a')) {
    closeNav();
  }
}

function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeNav();
  }
}

function openNav() {
  nav.classList.toggle('nav--open', true);
  button.setAttribute('aria-expanded', true);
  document.addEventListener('click', handleCloseEvents);
  document.addEventListener('keydown', handleEscKey);
}

function closeNav() {
  nav.classList.toggle('nav--open', false);
  button.setAttribute('aria-expanded', false);
  document.removeEventListener('click', handleCloseEvents);
  document.removeEventListener('keydown', handleEscKey);
}

function toggleNav() {
  if (nav.classList.contains('nav--open')) {
    closeNav();
    return;
  }

  openNav();
  return;
}

button.addEventListener('click', toggleNav);
