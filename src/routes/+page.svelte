<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const visibleShops = [1, 3, 7, 11, 15, 21, 23, 25, 27];

	import StoreCard from '$lib/components/StoreCard.svelte';
</script>

<div class="stores">
	{#each data.stores as store}
		{#if store.isActive === 1 && visibleShops.includes(Number(store.storeID))}
			<StoreCard storeData={store} />
		{/if}
	{/each}
</div>

<div class="more-deals">
	Go to <a href="/browse">browse</a> for even more deals!
</div>

<style>
	.stores {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(361px, 1fr));
		grid-gap: 1rem;
		margin: 2rem auto;
		max-width: 1280px;
		padding: 1rem;
	}

	.more-deals {
		display: block;
		color: var(--primary-text-color);
		text-align: center;
	}

	.more-deals a {
		text-decoration: underline;
	}
</style>
