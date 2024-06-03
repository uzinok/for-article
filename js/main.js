// бургер
const navToggleBg = document.querySelector('.nav-toggle-bg');

navToggleBg.addEventListener('click', function () {
	navToggleBg.classList.toggle('nav-toggle-bg--open')
});

const navToggleBefore = document.querySelector('.nav-toggle-before');

navToggleBefore.addEventListener('click', function () {
	navToggleBefore.classList.toggle('nav-toggle-before--open')
});

const summary = document.querySelector('.summary');
summary.addEventListener('click', function () {
	summary.classList.toggle('summary--show')
});
// бургер
