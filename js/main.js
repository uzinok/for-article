window.addEventListener('load', function() {
	const allCardTitle = document.querySelectorAll('.card__title');

	setHeightTitleCard();
	window.addEventListener('resize', setHeightTitleCard);

	function setHeightTitleCard() {
		const length = +getComputedStyle(document.body).getPropertyValue("--card-length")

		if (length == 1) return

		for (let i = 0; i < allCardTitle.length; i++) {
			allCardTitle[i].style.height = '';
		}

		for (let i = 0; i < allCardTitle.length; i = i + length) {

			let height = 0;
			let check = i + length;

			if (check > allCardTitle.length) check = allCardTitle.length

			for (let k = i; k < check; k++) {
				height = allCardTitle[k].scrollHeight > height ? height = allCardTitle[k].scrollHeight : height;
			}

			for (let k = i; k < check; k++) {
				allCardTitle[k].style.height = height + 'px';
			}

		}
	}
});
