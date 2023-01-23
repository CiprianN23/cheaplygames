<script lang="ts">
	import { page } from '$app/stores';

	let isMenuActive: boolean = false;
	const toggleButton = async () => {
		isMenuActive = !isMenuActive;
	};

	const nav = [
		{ title: 'Home', path: '/' },
		{ title: 'Browse', path: '/browse' },
		{ title: 'Contact', path: '/contact' }
	];
</script>

<header class="primary-header flex">
	<div>
		<a href="/"><img src="/logo-no-background.svg" alt="logo" class="logo" /></a>
	</div>

	<button
		class="mobile-nav-toggle"
		type="button"
		aria-label="Menu"
		aria-controls="primary-navigation"
		aria-expanded={isMenuActive}
		on:click={toggleButton}
	/>

	<nav>
		<ul id="primary-navigation" class="primary-navigation flex" data-visible={isMenuActive}>
			{#each nav as item}
				<li>
					<a class:isActive={$page.url.pathname === item.path} href={item.path}>{item.title}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.flex {
		display: flex;
		gap: var(--gap, 1rem);
	}

	.logo {
		margin: 1rem 2rem;
		width: 150px;
		height: 50px;
	}

	.primary-header {
		align-items: center;
		justify-content: space-between;
	}

	.primary-navigation {
		background: hsl(0 0% 0% / 0.5);
	}

	.mobile-nav-toggle {
		display: none;
	}

	@supports (backdrop-filter: blur(1rem)) {
		.primary-navigation {
			background: hsl(0 0% 100% / 0.1);
			backdrop-filter: blur(2.5rem);
		}
	}

	.primary-navigation a {
		color: var(--secondary-text-color);
		text-decoration: none;
		font-weight: 700;
		margin-inline-end: 0.75rem;
	}

	@media (max-width: 35em) {
		.primary-navigation {
			--gap: 2em;

			position: fixed;
			inset: 0 0 0 30%;
			z-index: 1000;

			flex-direction: column;
			padding: min(30vh, 10rem) 2em;

			transform: translateX(100%);
			transition: transform 350ms ease-out;
		}

		.primary-navigation[data-visible='true'] {
			transform: translateX(0%);
		}

		.mobile-nav-toggle {
			display: block;
			position: absolute;
			z-index: 9999;
			background-color: transparent;
			background-image: url('/menu.svg');
			background-repeat: no-repeat;
			width: 2rem;
			border: 0;
			aspect-ratio: 1;
			top: 2rem;
			right: 2rem;
		}

		.mobile-nav-toggle[aria-expanded='true'] {
			background-image: url('/close.svg');
		}
	}

	@media (min-width: 35em) {
		.primary-navigation {
			--gap: clamp(1rem, 0vh, 3rem);
			padding-block: 1.5rem;
			padding-inline: clamp(1rem, 1vh, 10rem);

			background-color: transparent;
		}

		.primary-navigation a {
			color: var(--primary-text-color);
		}
	}

	.isActive {
		color: var(--accent-color) !important;
	}
</style>
