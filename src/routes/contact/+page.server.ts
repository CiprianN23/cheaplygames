import type { Actions } from './$types';
import { PRIVATE_EMAIL } from '$env/static/private';
import { invalid } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('email');
		const name = data.get('name');
		const message = data.get('message');
		const emailRegex = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		if (!emailRegex.test(email?.toString() ?? '')) {
			return invalid(400, { name, message, email, invalidEmail: true });
		}

		const response = await fetch('https://mazi.ro/contact-submit.php', {
			method: 'POST',
			body: `name=${name}&email=${email}&message=${message}&myEmail=${PRIVATE_EMAIL}`,
			headers: { 'Content-type': 'application/x-www-form-urlencoded' }
		});

		if (!response.ok) {
			return invalid(400, { badResponse: true });
		}

		return { success: true };
	}
};
