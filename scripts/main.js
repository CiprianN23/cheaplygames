const toggleButton = document.getElementsByClassName('navbar-toggle')[0];
const navbarLinks = document.getElementsByClassName('navbar-links');

toggleButton.addEventListener('click', toggleNavMenu);

function toggleNavMenu () {
	for (let i = 0; i < navbarLinks.length; i++) {
		navbarLinks[i].classList.toggle('active');
	}
}

const navbaarLinksA = document.querySelectorAll('.navbar-links a');
navbaarLinksA.forEach(function(element) {
	const currentLocationWithoutParameters = location.href.split('?')[0];
	if (element.href === currentLocationWithoutParameters) {
    
		element.classList.add('current-link');
	}
});