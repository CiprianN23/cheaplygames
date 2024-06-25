import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { message } from 'sveltekit-superforms';
import { PRIVATE_EMAIL } from '$env/static/private';

// Define outside the load function so the adapter can be cached
const schema = z.object({
	name: z.string().min(1, 'You must enter a name'),
	email: z.string().email(),
	message: z.string().min(1, 'You must enter a message')
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return message(form, 'Invalid data!');
		}

		const req = await fetch('https://mazi.ro/contact-submit.php', {
			method: 'POST',
			headers: { 'Content-type': 'application/x-www-form-urlencoded' },
			body: `name=${form.data.name}&email=${form.data.email}&message=${form.data.message}&myEmail=${PRIVATE_EMAIL}`
		});

		if (!req.ok) {
			return message(form, 'An error has occurred! Form could not be sent!', {
				status: 500
			});
		}

		// Display a success status message
		return message(form, 'Contact form successfully submitted!');
	}
};
