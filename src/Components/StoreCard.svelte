<script lang="ts">
	import { onMount } from 'svelte';
	import StoreDeal from '../Components/StoreDeal.svelte';

	export let storeData: any;

	$: storeDeals = [];

	onMount(async () => {
		const url = `https://www.cheapshark.com/api/1.0/deals?storeID=${storeData.storeID}&pageSize=7`;
		const res = await fetch(url);
		storeDeals = res.ok && (await res.json());
	});
</script>

<div class="card">
	<div class="card-header">
		<img
			src="https://www.cheapshark.com/img/stores/banners/{storeData.storeID - 1}.png"
			alt={storeData.storeName}
			height="50"
		/>
	</div>
	<div class="card-body">
		{#each storeDeals as deal}
			<StoreDeal dealData={deal} />
		{:else}
			Loading....
		{/each}
		<a href="/browse?storeID={storeData.storeID}" class="btn">View all deals</a>
	</div>
</div>

<style>
	.card {
		background-color: #fff;
		border: 1px solid #ccc;
		margin-bottom: 50px;
		transition: 0.3s;
	}

	.card-header {
		text-align: center;
		padding: 25px 10px;
		background-color: var(--secondary-color);
		color: #fff;
	}

	.card-header > img {
		max-width: 100%;
		max-height: 100%;
	}

	.card-body {
		padding: 30px 10px;
		text-align: center;
		font-size: 14px;
		background-color: var(--tertiary-color);
	}

	.card-body .btn {
		display: block;
		color: #fff;
		text-align: center;
		background: var(--secondary-color);
		text-decoration: none;
		margin-top: 30px;
		padding: 10px 5px;
		transition: 0.3s;
	}

	.card-body .btn:hover {
		transform: scale(1.04);
		color: var(--accent-color);
	}
</style>
