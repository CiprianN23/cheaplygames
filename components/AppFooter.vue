<script lang="ts" setup>
const navItems = [
	{ id: 1, title: 'Home', path: '/' },
	{ id: 2, title: 'Browse', path: '/browse' },
	{ id: 3, title: 'Contact', path: '/contact' },
	{ id: 4, title: 'Privacy Policy', path: '/privacy' },
	{ id: 5, title: 'Terms & Conditions', path: '/terms' }
];
</script>

<template>
	<footer>
		<div class="icon-wrapper">
			<NuxtLink aria-label="Twitter" class="link" to="https://twitter.com/cheaply_games" external>
				<Icon name="mdi:twitter" />
			</NuxtLink>
			<NuxtLink aria-label="Github" class="link" to="https://github.com/CiprianN23/cheaplygames" external>
				<Icon name="mdi:github" />
			</NuxtLink>
		</div>
		<br >

		<div class="link-wrapper">
			<ul>
				<li v-for="item in navItems" :key="item.id">
					<NuxtLink :aria-label="item.title" class="link" :to="item.path"> {{ item.title }}</NuxtLink>
				</li>
			</ul>
			<br >
			<p>
				This website uses&nbsp;
				<NuxtLink class="link" to="https://apidocs.cheapshark.com/" external>CheapShark API</NuxtLink>
			</p>
			<br >
			<p class="font-size-200">
				The prices listed on this site are correct to the best of our knowledge. CheaplyGames offers
				no guarantee on accuracy or availability. Copyrights and trademarks are the property of their
				respective owners.
			</p>
			<br >
			<p class="font-size-200">© 2025 CheaplyGames, most cheap games!</p>
			<p class="font-size-200">All rights reserved.</p>
		</div>
	</footer>
</template>

<style scoped>
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

ul .link {
	color: var(--text);
}

li {
	padding: 0.5em 0;
}

p .link {
	color: var(--text);
}

.icon-wrapper {
	display: flex;
}

.icon-wrapper .link {
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