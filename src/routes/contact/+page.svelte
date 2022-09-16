<script lang="ts">
	import Message from '$lib/components/Message.svelte'
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="message-container">
	{#if form?.success}
		<Message message="Contact submitted successfully!" messageType="success-msg" />
	{/if}
	{#if form?.invalidEmail}
		<Message message="Email address is not valid!" messageType="error-msg" />
	{/if}
	{#if form?.badResponse}
		<Message message="There has been an error. Submiting failed!" messageType="error-msg" />
	{/if}
</div>

<form method="POST" class="contact-form" id="contact-form">
	<div class="title">
		<h2>CONTACT US</h2>
	</div>
	<div class="half">
		<div class="item">
			<label for="name">NAME</label>
			<input type="text" id="name" name="name" required />
		</div>
		<div class="item">
			<label for="email ">EMAIL</label>
			<input type="text" id="email" name="email" required />
		</div>
	</div>
	<div class="full">
		<label for="message">MESSAGE</label>
		<textarea name="message" id="message" required />
	</div>
	<div class="action">
		<input type="submit" value="SEND MESSAGE" />
	</div>
</form>

<style>
	.message-container {
		width: 50rem;
		max-width: 97%;
		margin: 50px auto;
	}

	.contact-form {
		background: var(--secondary-color);
		width: 50rem;
		margin: 50px auto;
		max-width: 97%;
		border-radius: 4px;
		padding: 55px 30px;
	}

	.contact-form .title h2 {
		letter-spacing: 6px;
		border-bottom: 1px solid var(--primary-text-color);
		display: inline-block;
		padding-bottom: 8px;
		margin-bottom: 32px;
		color: var(--primary-text-color);
	}

	.contact-form .half {
		display: flex;
		justify-content: space-between;
	}

	.contact-form .half .item {
		display: flex;
		flex-direction: column;
		margin-bottom: 24px;
		width: 48%;
	}

	.contact-form label {
		display: block;
		font-size: 13px;
		letter-spacing: 3.5px;
		margin-bottom: 16px;
		color: var(--primary-text-color);
	}

	.contact-form .half .item input {
		border-radius: 4px;
		border: 1px solid white;
		outline: 0;
		padding: 16px;
		width: 100%;
		height: 44px;
		background: var(--tertiary-color);
		font-size: 17px;
	}

	.contact-form .full {
		margin-bottom: 24px;
	}

	.contact-form .full textarea {
		background: var(--tertiary-color);
		border-radius: 4px;
		border: 1px solid white;
		outline: 0;
		padding: 12px 16px;
		width: 100%;
		height: 200px;
		font-size: 17px;
	}

	.contact-form .action {
		margin-bottom: 32px;
	}

	.contact-form .action input {
		border-radius: 4px;
		border: 1px solid white;
		cursor: pointer;
		font-size: 13px;
		font-weight: 600;
		height: 44px;
		letter-spacing: 3px;
		outline: 0;
		padding: 0 20px 0 22px;
		margin-right: 10px;
	}

	.contact-form .action input[type='submit'] {
		background: var(--accent-color);
		color: var(--secondary-text-color);
	}

	@media screen and (max-width: 620px) {
		.contact-form .half {
			flex-direction: column;
		}
		.contact-form .half .item {
			width: 100%;
		}
		.contact-form .action {
			display: flex;
			flex-direction: column;
		}
		.contact-form .action input {
			margin-bottom: 10px;
			width: 100%;
		}
	}
</style>
