<script>
	import '$lib/styles/reset.css';
	import '$lib/styles/variables.css';
	import '$lib/styles/global.css';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<NavBar />

{@render children()}

<Footer />
