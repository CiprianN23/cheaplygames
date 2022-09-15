<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import StoreCard from '../Components/StoreCard.svelte';
</script>

<div class="stores">
	{#each data.stores as store}
		{#if store.isActive === 1}
			<StoreCard storeData={store} />
		{/if}
	{/each}
</div>

<style>
	.stores {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(361px, 1fr));
		grid-gap: 1rem;
		width: 97%;
		margin: 50px auto;
	}
</style>
