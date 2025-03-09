<script setup lang="ts">
import { ref } from 'vue'

const navItems = [
	{ id: 1, title: 'Home', path: '/' },
	{ id: 2, title: 'Browse', path: '/browse' },
	{ id: 3, title: 'Contact', path: '/contact' }
];

const isMenuActive = ref(false);
</script>


<template>
	<header>
		<div class="logo">
			<NuxtLink aria-label="Logo with home link" class="link" title="home" to="/">
				<Icon name="Logo" />
			</NuxtLink>
		</div>

		<button type="button" aria-controls="primary-navigation" :aria-expanded="isMenuActive" @click="isMenuActive = !isMenuActive">
			<span class="sr-only">Menu</span>
			<Icon v-if="isMenuActive" name="bi:x-lg"  />
			<Icon v-else name="bi:list"  />
		</button>

		<nav>
			<ul id="primary-navigation" :data-visible="isMenuActive">
				<li v-for="item in navItems" :key="item.id">
					<NuxtLink :aria-label="item.title" class="link" :to="item.path" @click="isMenuActive = false"> {{ item.title }}</NuxtLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style scoped>
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

.logo .link {
	text-decoration: none;
	color: #fff;
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

li .link {
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