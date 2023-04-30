<script lang="ts">
	import type { PageData } from './$types';
	import DealLastChange from '$lib/components/DealLastChange.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import AddTableARIA from '$lib/addtablearia';
	import { onMount } from 'svelte';
	import { GameVendorsStore } from '$lib/stores';

	export let data: PageData;
	let isDisabled: boolean = false;
	let storeID = $page.url.searchParams.get('storeID');
	let sortBy: string = 'Deal Rating';
	let desc: number = 0;
	let selectedValue: string = 'Deal Rating';
	let gameVendors = $GameVendorsStore;

	let currentPage: number = 0;

	let title: string;

	const cheapSharkStoreLogoLink = 'https://cheapshark.com/img/stores/icons/';
	const cheapSharkDealLink = 'https://www.cheapshark.com/redirect?dealID=';

	async function refreshDeals() {
		if (currentPage) {
			$page.url.searchParams.set('pageNumber', currentPage.toString());
		} else {
			$page.url.searchParams.delete('pageNumber');
		}

		if (storeID) {
			$page.url.searchParams.set('storeID', storeID);
		} else {
			$page.url.searchParams.delete('storeID');
		}

		if (sortBy) {
			$page.url.searchParams.set('sortBy', sortBy);
		}

		if (sortBy === 'Deal Rating') {
			$page.url.searchParams.delete('sortBy');
		}

		if (title) {
			$page.url.searchParams.set('title', title);
		} else {
			$page.url.searchParams.delete('title');
		}

		await goto(`${$page.url.href}`, { invalidateAll: true });
	}

	const previousPage = async () => {
		currentPage -= 1;
		isDisabled = true;
		await refreshDeals();
		isDisabled = false;
		document.body.scrollIntoView();
	};

	const nextPage = async () => {
		currentPage += 1;
		isDisabled = true;
		await refreshDeals();
		isDisabled = false;
		document.body.scrollIntoView();
	};

	async function sortByColumn(column: string) {
		sortBy = column;
		await refreshDeals();
	}

	onMount(() => {
		AddTableARIA();
		console.log(gameVendors);
	});
</script>

<div class="container">
	<div class="filtering">
		<div>
			<input
				placeholder="Search"
				type="search"
				name="title"
				bind:value={title}
				on:change={async () => await refreshDeals()}
			/>
			<button on:click={async () => await refreshDeals()}>Show</button>

			<div class="hidden">
				<label for="orderBy">Sort: </label>
				<select
					name="orderBy"
					id="orderBy"
					bind:value={selectedValue}
					on:change={async () => await sortByColumn(selectedValue)}
				>
					<option value="Price">Price: lowest</option>
					<option value="Deal Rating" selected>Best Deals</option>
					<option value="Title">A-Z</option>
					<option value="Savings">Savings</option>
					<option value="recent">Last Change</option>
				</select>
			</div>
		</div>
	</div>

	<table class="deals-table">
		<tr>
			<th
				on:click={async () => await sortByColumn('Store')}
				class:headerSortDown={desc === 0 && sortBy === 'Store'}
				class:headerSortUp={desc === 1 && sortBy === 'Store'}>Store</th
			>
			<th
				on:click={async () => await sortByColumn('Savings')}
				class:headerSortDown={desc === 0 && sortBy === 'Savings'}
				class:headerSortUp={desc === 1 && sortBy === 'Savings'}>Savings</th
			>
			<th
				on:click={async () => await sortByColumn('Price')}
				class:headerSortDown={desc === 0 && sortBy === 'Price'}
				class:headerSortUp={desc === 1 && sortBy === 'Price'}>Price</th
			>
			<th
				on:click={async () => await sortByColumn('Title')}
				class:headerSortDown={desc === 0 && sortBy === 'Title'}
				class:headerSortUp={desc === 1 && sortBy === 'Title'}>Title</th
			>
			<th
				on:click={async () => await sortByColumn('Deal Rating')}
				class:headerSortDown={desc === 0 && sortBy === 'Deal Rating'}
				class:headerSortUp={desc === 1 && sortBy === 'Deal Rating'}>Deal Rating</th
			>
			<th
				on:click={async () => await sortByColumn('recent')}
				class:headerSortDown={desc === 0 && sortBy === 'recent'}
				class:headerSortUp={desc === 1 && sortBy === 'recent'}>Last Change</th
			>
		</tr>
		{#each data.deals as deal}
			<tr>
				<td data-cell="store">
					<img
						src={cheapSharkStoreLogoLink + (Number(deal.storeID) - 1) + '.png'}
						alt={gameVendors[Number(deal.storeID) - 1].storeName}
						title={gameVendors[Number(deal.storeID) - 1].storeName}
					/>
				</td>
				<td data-cell="savings">
					{Math.round(Number(deal.savings))}%
				</td>
				<td data-cell="price">
					<span>
						${deal.salePrice}
						{#if deal.isOnSale === '1'}
							<s>${deal.normalPrice}</s>
						{/if}
					</span>
				</td>
				<td data-cell="title">
					<a href={cheapSharkDealLink + deal.dealID}>{deal.title}</a>
				</td>
				<td data-cell="deal rating">
					{deal.dealRating}
				</td>
				<td data-cell="last change">
					<DealLastChange time={new Date(deal.lastChange * 1000)} />
				</td>
			</tr>
		{:else}
			Loading....
		{/each}
	</table>

	<nav>
		<p class="page">Page {currentPage + 1} of {Number(data.maxPages) + 1}</p>
		<ul class="pagination" id="pagination">
			{#if currentPage > 0}
				<li>
					<button disabled={isDisabled} class:disabled={isDisabled} on:click={previousPage}
						>&#8592; Prev</button
					>
				</li>
			{/if}
			{#if currentPage < Number(data.maxPages)}
				<li>
					<button disabled={isDisabled} class:disabled={isDisabled} on:click={nextPage}
						>Next &rarr;</button
					>
				</li>
			{/if}
		</ul>
	</nav>
</div>

<style>
	input[type='search'] {
		outline: 0;
		border: 0;
		height: 1.5rem;
		padding-left: 1rem;
		border-radius: 2em;
		transition: all 0.3s cubic-bezier(0, 0, 0.43, 1.49);
		transition-property: width, border-radius;
		color: var(--secondary-text-color);
	}

	.hidden {
		display: none;
	}

	#orderBy {
		margin-left: 0.2rem;
		border: 1px solid #ced4da;
		border-radius: 2em;
		color: #000;
	}

	.filtering {
		display: flex;
		color: var(--primary-text-color);
	}

	.filtering button {
		display: inline-block;
		font-weight: bold;
		padding: 0.1em 1em;
		margin: 0 0.3em 0.3em 0;
		border: none;
		border-radius: 2em;
		text-decoration: none;
		color: var(--secondary-text-color);
		background-color: var(--accent-color);
		text-align: center;
	}

	.container {
		width: min(900px, 100% - 3rem);
		margin-inline: auto;
	}

	.disabled {
		cursor: none;
		background-color: #999 !important;
		color: var(--primary-text-color) !important;
	}

	.page {
		text-align: center;
		color: var(--primary-text-color);
		font-size: 0.95rem;
	}

	#pagination {
		display: flex;
		justify-content: center;
		border-top: 1px solid #eee;
		margin-top: 1em;
		padding-top: 0.5em;
		list-style: none;
	}

	#pagination li {
		margin: 0 1px;
	}

	#pagination button {
		color: var(--primary-text-color);
		background-color: var(--primary-color);
		display: block;
		padding: 0.5em 1em;
		border: 1px solid #999;
		border-radius: 0.2em;
		text-decoration: none;
	}

	#pagination button:hover {
		color: var(--accent-color);
	}

	.deals-table {
		width: 100%;
		border-collapse: collapse;
		background-color: var(--tertiary-color);
		margin-top: 1rem;
	}

	.deals-table tr:nth-of-type(2n) {
		background: hsl(0 0% 0% / 0.075);
	}

	.deals-table th {
		background-color: var(--secondary-color);
		color: #000;
		text-align: left;
		font-weight: bold;
	}

	.deals-table th:hover {
		text-decoration: underline;
	}

	.deals-table th,
	.deals-table td {
		padding: 1rem;
		text-align: left;
	}

	.deals-table a {
		text-decoration: underline;
	}

	.headerSortDown:after,
	.headerSortUp:after {
		content: ' ';
		position: relative;
		left: 10px;
		border: 7px solid transparent;
	}
	.headerSortDown:after {
		top: 10px;
		border-top-color: silver;
	}
	.headerSortUp:after {
		bottom: 15px;
		border-bottom-color: silver;
	}
	.headerSortDown,
	.headerSortUp {
		padding-left: 20px;
	}

	@media only screen and (max-width: 1024px) {
		.deals-table th {
			display: none;
		}

		.deals-table td {
			display: grid;
			gap: 0.5rem;
			grid-template-columns: 15ch auto;
			padding: 0.5rem 1rem;
		}

		.deals-table td:first-child {
			padding-top: 2rem;
		}

		.deals-table td:last-child {
			padding-bottom: 2rem;
		}

		td:before {
			content: attr(data-cell) ': ';
			font-weight: 700;
			text-transform: capitalize;
		}

		.filtering {
			margin-left: 0.5rem;
		}

		.hidden {
			display: block;
		}
	}
</style>
