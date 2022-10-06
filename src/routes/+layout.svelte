<script>
	import '@unocss/reset/tailwind.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
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
		font-family: 'Poppins', sans-serif;
	}

	:global(body) {
		background-color: var(--primary-color);
		overflow-x: hidden;
	}
</style>
