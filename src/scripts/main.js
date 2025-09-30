const button = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav__list");

function toggleNav() {
	const isExpanded = nav.classList.toggle("nav--open");

	button.setAttribute("aria-expanded", isExpanded);
}

button.addEventListener("click", toggleNav);
