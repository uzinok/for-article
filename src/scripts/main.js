const button = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav__list");

nav.classList.remove("nav--no-js");

// Функция для обработки событий закрытия (клик вне или на ссылку внутри)
function handleCloseEvents(event) {
  // Если клик вне навигации ИЛИ клик на ссылку внутри навигации
  if (!nav.contains(event.target) || event.target.closest('a')) {
    closeNav();
  }
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    closeNav();
  }
}

// Функция закрытия навигации
function closeNav() {
  nav.classList.toggle("nav--open", false);
  button.setAttribute("aria-expanded", false);

  // Удаляем слушатели при закрытии
  document.removeEventListener("click", handleCloseEvents);
  document.removeEventListener("keydown", handleEscKey);
}

// Функция открытия навигации
function openNav() {
  nav.classList.toggle("nav--open", true);
  button.setAttribute("aria-expanded", true);

  // Добавляем слушатели при открытии
  document.addEventListener("click", handleCloseEvents);
  document.addEventListener("keydown", handleEscKey);
}

function toggleNav() {
  if (nav.classList.contains("nav--open")) {
    closeNav();
  } else {
    openNav();
  }
}

button.addEventListener("click", toggleNav);
