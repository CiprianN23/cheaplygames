<script lang="ts">
	import MdiTwitter from '~icons/mdi/twitter';
	import MdiGithub from '~icons/mdi/github';

	const navItems = [
		{ id: 1, title: 'Home', path: '/' },
		{ id: 2, title: 'Browse', path: '/browse' },
		{ id: 3, title: 'Contact', path: '/contact' },
		{ id: 4, title: 'Privacy Policy', path: '/privacy' },
		{ id: 5, title: 'Terms & Conditions', path: '/terms' }
	];
</script>

<footer>
	<div class="icon-wrapper">
		<a
			href="https://twitter.com/cheaply_games"
			aria-label="CheaplyGames twitter page"
			target="_blank"
			rel="noreferrer"
		>
			<MdiTwitter aria-label="CheaplyGames twitter page" />
		</a>
		<a
			href="https://github.com/CiprianN23/cheaplygames"
			aria-label="CheaplyGames github public repository"
			target="_blank"
			id="github"
			rel="noreferrer"
		>
			<MdiGithub aria-label="CheaplyGames github public repository" />
		</a>
	</div>
	<br />

	<div class="link-wrapper">
		<ul>
			{#each navItems as navItem (navItem.id)}
				<li>
					<a href={navItem.path}>{navItem.title}</a>
				</li>
			{/each}
		</ul>
		<br />
		<p>
			This website uses&nbsp;
			<a
				href="https://apidocs.cheapshark.com/"
				aria-label="cheapshark API documentation"
				target="_blank"
				rel="noreferrer"
			>
				CheapShark API
			</a>
		</p>
		<br />
		<p class="font-size-200">
			The prices listed on this site are correct to the best of our knowledge. CheaplyGames offers
			no guarantee on accuracy or availability. Copyrights and trademarks are the property of their
			respective owners.
		</p>
		<br />
		<p class="font-size-200">© {new Date().getFullYear()} CheaplyGames, most cheap games!</p>
		<p class="font-size-200">All rights reserved.</p>
	</div>
</footer>

<style>
	footer {
		padding: 2em 0;
		margin: 2em 0 0 0;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--background-lighten-10);
	}

	ul {
		padding: 1em;
		list-style-type: none;
	}

	ul a {
		color: var(--text);
	}

	li {
		padding: 0.5em 0;
	}

	p a {
		color: var(--text);
	}

	.icon-wrapper {
		display: flex;
	}

	.icon-wrapper a {
		padding: 0 1em 1em;
		color: var(--text);
	}

	.link-wrapper {
		font-size: var(--fontSize300);
	}

	.font-size-200 {
		font-size: var(--fontSize200);
	}

	@media (min-width: 40em) {
		ul {
			display: flex;
			justify-content: space-evenly;
		}
	}
</style>
