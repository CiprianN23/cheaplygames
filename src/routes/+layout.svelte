<script>
	import 'uno.css';
	import Navbar from '$lib/components/Navbar.svelte'
	import Footer from '$lib/components/Footer.svelte'
</script>

<Navbar />

<slot />

<Footer />

<style>
	:root {
		--primary-color: hsl(226, 15%, 23%);
		--secondary-color: hsl(225, 8%, 41%);
		--tertiary-color: hsl(0, 0%, 97%);
		--accent-color: hsl(198, 100%, 79%);
		--primary-text-color: hsl(0, 0%, 100%);
		--secondary-text-color: hsl(0, 0%, 0%);
	}

	:global(*) {
		box-sizing: border-box;
		font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background-color: var(--primary-color);
	}
</style>
