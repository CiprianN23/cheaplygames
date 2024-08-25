<script>
	import Logo from '$lib/components/Logo.svelte';
	import BiList from '~icons/bi/list';
	import BiXLg from '~icons/bi/x-lg';

	let isMenuActive = $state(false);

	const navItems = [
		{ id: 1, title: 'Home', path: '/' },
		{ id: 2, title: 'Browse', path: '/browse' },
		{ id: 3, title: 'Contact', path: '/contact' }
	];
</script>

<header>
	<div class="logo">
		<a href="/"><Logo /></a>
	</div>

	<button
		aria-controls="primary-navigation"
		aria-expanded={`${isMenuActive}`}
		onclick={() => (isMenuActive = !isMenuActive)}
	>
		<span class="sr-only">Menu</span>
		{#if isMenuActive}
			<BiXLg />
		{:else}
			<BiList />
		{/if}
	</button>

	<nav>
		<ul id="primary-navigation" data-visible={`${isMenuActive}`}>
			{#each navItems as navItem (navItem.id)}
				<li>
					<a onclick={() => (isMenuActive = false)} href={navItem.path}>{navItem.title}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
	}

	div {
		color: var(--text);
	}

	.logo {
		margin-left: 1em;
	}

	.logo a {
		text-decoration: none;
		color: #FFF;
	}

	button {
		color: var(--text);
		display: none;
		border: 0;
		background-color: transparent;
	}

	nav {
		margin-right: 1.2em;
	}

	ul {
		display: flex;
		gap: 1rem;
		list-style: none;
	}

	li a {
		text-decoration: none;
		color: var(--text);
	}

	@media (max-width: 40em) {
		button {
			display: block;
			position: absolute;
			z-index: 9999;
			width: 2rem;
			aspect-ratio: 1;
			top: 2rem;
			right: 2rem;
		}

		ul {
			background-color: var(--background-lighten-10);
			gap: 3em;
			position: fixed;
			z-index: 1000;
			inset: 0 0 0 0;
			flex-direction: column;
			padding: min(30vh, 10rem) 2em;
		}

		ul[data-visible='false'] {
			transform: translateX(100%);
		}

		ul[data-visible='true'] {
			transform: translateX(0%);
		}
	}
</style>
