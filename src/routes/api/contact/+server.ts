import type { RequestHandler } from './$types';
import { PRIVATE_EMAIL } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const requestBody = await request.json();

    const name: String = requestBody.name;
    const email: String = requestBody.email;
    const message: String = requestBody.message;

    const response = await fetch('https://mazi.ro/contact-submit.php', {
        method: 'POST',
        body: `name=${name}&email=${email}&message=${message}&myEmail=${PRIVATE_EMAIL}`,
		headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    });

    return response;
}