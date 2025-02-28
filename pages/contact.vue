<script setup>
import { useForm } from '@formwerk/core';

const runtimeConfig = useRuntimeConfig();

const name = ref('');
const email = ref('');
const message = ref('');

const { handleSubmit, isSubmitting, wasSubmitted } = useForm();

const onSubmit = handleSubmit(async (data) => {
	const json = data.toObject();

	await $fetch('https://mazi.ro/contact-submit.php', {
		method: 'POST',
		headers: { 'Content-type': 'application/x-www-form-urlencoded' },
		body: `name=${json.name}&email=${json.email}&message=${json.message}&myEmail=${runtimeConfig.public.PRIVATE_EMAIL}`
	});

});
</script>

<template>

	<form v-if="!wasSubmitted" method="POST" @submit="onSubmit">

		<div>
			<h1>CONTACT US</h1>
		</div>

		<div class="form-wrapper">
			<div class="field-wrapper">
				<TextField v-model="name" label="Your name" name="name" placeholder="John Doe" type="text" required />
			</div>

			<div class="field-wrapper">
				<TextField v-model="email" label="Your email" name="email" placeholder="example@mail.com" type="email"
					required />
			</div>
		</div>

		<div class="wrapper-textarea">
			<TextAreaField v-model="message" label="Your message" name="message" required />
		</div>

		<div class="button">
			<button :disabled="isSubmitting" type="submit">SEND MESSAGE</button>
		</div>
	</form>

	<h1 v-else class="center">Submission successful!</h1>

</template>

<style scoped>
form {
	background: var(--secondary);
	width: 50rem;
	margin: 50px auto;
	max-width: 97%;
	border-radius: 4px;
	padding: 55px 30px;
}

h1 {
	font-size: var(--fontSize500);
	letter-spacing: 6px;
	border-bottom: 1px solid var(--text);
	display: inline-block;
	padding-bottom: 8px;
	margin-bottom: 32px;
	color: var(--text);
}

.center {
	text-align: center;
	margin: 0 auto;
	display: block;
}

label {
	display: block;
	font-size: var(--fontSize300);
	letter-spacing: 0.2em;
	margin-bottom: 16px;
	color: var(--text);
}

input,
textarea {
	border-radius: 4px;
	border: 1px solid var(--text);
	outline: 0;
	padding: 16px;
	width: 100%;
	height: 44px;
	background: var(--background);
}

textarea {
	padding: 12px 16px;
	height: 200px;
	background: var(--background);
}

button {
	border-radius: 4px;
	border: 1px solid var(--text);
	cursor: pointer;
	font-weight: 600;
	height: 44px;
	letter-spacing: 0.1em;
	outline: 0;
	padding: 0 20px 0 22px;
	margin-right: 10px;
	background: var(--accent);
	color: var(--secondary);
}

.field-wrapper {
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;
	width: 48%;
}

.form-wrapper {
	display: flex;
	justify-content: space-between;
}

.wrapper-textarea {
	margin-bottom: 24px;
}

.button {
	margin-bottom: 32px;
}

@media screen and (max-width: 40em) {
	button {
		margin-bottom: 10px;
		width: 100%;
	}

	.form-wrapper {
		flex-direction: column;
	}

	.wrapper {
		width: 100%;
	}
}
</style>