const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (event) => {
	event.preventDefault();

	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const messageInput = document.getElementById('message');

	const postResponse = await fetch('https://mazi.ro/contact-submit.php', {
		method: 'POST',
		body: `name=${nameInput.value}&email=${emailInput.value}&message=${messageInput.value}&myEmail=gamescheaply@gmail.com`,
		headers: { 'Content-type': 'application/x-www-form-urlencoded' }
	});

	const jsonResponse = await postResponse.json();
	console.log(jsonResponse);

});
