<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, constraints, message } = superForm(data.form);
</script>

<svelte:head>
	<title>CheaplyGames - Contact</title>
	<meta name="description" content="Contact us page for CheaplyGames" />
</svelte:head>

<form method="POST">
	{#if $message}<h3>{$message}</h3>{/if}

	<div>
		<h1>CONTACT US</h1>
	</div>

	<div class="form-wrapper">
		<div class="wrapper">
			<label for="name">Name</label>
			<input
				type="text"
				name="name"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
		</div>

		<div class="wrapper">
			<label for="email">E-mail</label>
			<input
				type="email"
				name="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			/>
			{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
		</div>
	</div>

	<div class="wrapper-textarea">
		<label for="message">Message</label>
		<textarea
			name="message"
			aria-invalid={$errors.message ? 'true' : undefined}
			bind:value={$form.message}
			{...$constraints.message}
		></textarea>
		{#if $errors.message}<span class="invalid">{$errors.message}</span>{/if}
	</div>

	<div class="button">
		<button>SEND MESSAGE</button>
	</div>
</form>

<style>
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

	h3 {
		margin-bottom: 2rem;
		background: var(--background-lighten-10);
		color: var(--text);
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

	.wrapper {
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

	.invalid {
		color: red;
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
