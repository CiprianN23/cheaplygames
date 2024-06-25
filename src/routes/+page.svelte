<script lang="ts">
	import type { GameStore } from '$lib/types';
	import StoreCard from '$lib/components/StoreCard.svelte';

	const visibleShops = ['1', '3', '7', '11', '15', '21', '23', '25', '27'];
	const { data } = $props();

	function StoreIsVisible(value: GameStore) {
		return value.isActive === 1 && visibleShops.includes(value.storeID);
	}
</script>

<svelte:head>
	<title>CheaplyGames - The place to find game deals</title>
	<meta
		name="description"
		content="Summary of popular on going deals from popular online game stores"
	/>
</svelte:head>

<div class="wrapper">
	{#each data.storeData as store (store.storeID)}
		{#if StoreIsVisible(store)}
			<StoreCard storeData={store} />
		{/if}
	{/each}
</div>

<div class="browse-more">
	<a href="/browse">Browse</a> for more deals!
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(361px, 1fr));
		gap: 1rem;
		margin: 2rem auto;
		max-width: 1280px;
	}

	.browse-more {
		display: block;
		color: var(--text);
		text-align: center;
	}

	.browse-more a {
		text-decoration: underline;
		color: var(--text);
	}

	.browse-more a:hover {
		color: var(--primary);
	}
</style>
