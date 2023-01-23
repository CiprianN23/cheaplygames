import type { Actions } from './$types';
import { PRIVATE_EMAIL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

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
			return fail(400, { invalidEmail: true, badResponse: false, success: false });
		}

		const response = await fetch('https://mazi.ro/contact-submit.php', {
			method: 'POST',
			body: `name=${name}&email=${email}&message=${message}&myEmail=${PRIVATE_EMAIL}`,
			headers: { 'Content-type': 'application/x-www-form-urlencoded' }
		});

		if (!response.ok) {
			return fail(400, { invalidEmail: false, badResponse: true, success: false });
		}

		return { invalidEmail: false, badResponse: false, success: true };
	}
};
