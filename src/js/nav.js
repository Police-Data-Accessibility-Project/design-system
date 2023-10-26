document.addEventListener('DOMContentLoaded', function () {
	var body = document.querySelector('body');
	var menuButton = document.querySelector('.nav-open-button');
	var navMenu = document.querySelector('.nav');

	menuButton.addEventListener('click', function () {
		if (navMenu.classList.contains('hide-max-lg')) {
			// Hide class
			navMenu.classList.remove('hide-max-lg');
			// a11y
			navMenu.setAttribute('aria-expanded', true);
			// Lock scroll on body while nave is open
			body.classList.add('lock-scroll');
		} else {
			navMenu.classList.add('hide-max-lg');
			navMenu.setAttribute('aria-expanded', false);
			body.classList.remove('lock-scroll');
		}
	});
});
