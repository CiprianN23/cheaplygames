<script lang="ts">
	import { page } from '$app/stores';

	let active: boolean = false;
	const toggleButton = async () => {
		active = !active;
	};

	const nav = [
		{ title: 'Home', path: '/' },
		{ title: 'Browse', path: '/browse' },
		{ title: 'Contact', path: '/contact' }
	];
</script>

<nav class="navbar">
	<div class="brand-title" />
	<a href={'#'} class="toggle-button" on:click={toggleButton}>
		<span class="bar" />
		<span class="bar" />
		<span class="bar" />
	</a>
	<div class="navbar-links" class:active>
		<ul>
			{#each nav as item}
				<li>
					<a href={item.path} class:isActive={$page.url.pathname === item.path}>{item.title}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--primary-color);
		color: var(--primary-text-color);
	}

	.navbar-links ul {
		display: flex;
	}

	.navbar-links li {
		list-style: none;
	}

	.navbar-links li a {
		text-decoration: none;
		color: var(--primary-text-color);
		padding: 1rem;
		display: block;
	}

	.navbar-links li a:hover {
		color: var(--accent-color);
	}

	.toggle-button {
		position: absolute;
		top: 0.75rem;
		right: 1rem;
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 31px;
		height: 21px;
	}

	.toggle-button .bar {
		height: 3px;
		width: 100%;
		background-color: var(--primary-text-color);
		border-radius: 10px;
	}

	.isActive {
		color: var(--accent-color) !important;
	}

	@media (max-width: 650px) {
		.toggle-button {
			display: flex;
		}

		.navbar-links {
			display: none;
			width: 100%;
		}

		.navbar {
			flex-direction: column;
			align-items: flex-start;
		}

		.navbar-links ul {
			width: 100%;
			flex-direction: column;
		}

		.navbar-links li {
			text-align: center;
		}

		.navbar-links li a {
			padding: 0.5rem 1rem;
		}

		.navbar-links.active {
			display: flex;
		}
	}
</style>
