<script lang="ts">
	import { onMount } from 'svelte';
	import StoreDeal from './StoreDeal.svelte';
	import type { GameStore, GameDeal } from '$lib/types';

	const { storeData } = $props<{
		storeData: GameStore;
	}>();
	let storeDeals = $state<GameDeal[]>([]);

	onMount(async () => {
		const url = `https://www.cheapshark.com/api/1.0/deals?storeID=${storeData.storeID}&pageSize=7`;
		const res = await fetch(url);
		storeDeals = await res.json();
	});
</script>

<div class="wrapper">
	<div class="banner">
		<picture>
			<source
				width="64"
				height="64"
				srcset={`./storelogos/${Number(storeData.storeID) - 1}.avif`}
				type="image/avif"
			/>
			<source
				width="64"
				height="64"
				srcset={`./storelogos/${Number(storeData.storeID) - 1}.webp`}
				type="image/webp"
			/>
			<img
				width="64"
				height="64"
				src={`./storelogos/${Number(storeData.storeID) - 1}.png`}
				alt={storeData.storeName}
			/>
		</picture>
	</div>
	<div class="deals-wrapper">
		{#each storeDeals as storeDeal (storeDeal.dealID)}
			<StoreDeal dealData={storeDeal} />
		{:else}
			Loading....
		{/each}
		<a href="/browse?storeID={storeData.storeID}" class="btn">View all deals</a>
	</div>
</div>

<style>
	img,
	picture {
		display: inline;
		max-width: 100%;
		max-height: 100%;
		height: 64px;
		width: 64px;
	}

	.wrapper {
		border: 1px solid #ccc;
		margin-bottom: 50px;
	}

	.deals-wrapper {
		padding: 30px 10px;
		text-align: center;
		font-size: var(--fontSize300);
		background-color: var(--background);
		min-height: 31rem;
	}

	.banner {
		text-align: center;
		padding: 25px 10px;
		background-color: var(--background-lighten-10);
		color: var(--text);
	}

	.btn {
		display: block;
		color: var(--text);
		text-align: center;
		background-color: var(--background);
		text-decoration: none;
		margin-top: 30px;
		padding: 10px 5px;
	}

	.btn:hover {
		color: var(--accent);
	}
</style>
