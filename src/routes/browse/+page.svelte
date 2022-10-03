<script lang="ts">
	import type { PageData } from './$types';
	import DealLastChange from '$lib/components/DealLastChange.svelte';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';

	export let data: PageData;
	let isDisabled: boolean = false;
	let storeID = $page.url.searchParams.get('storeID');
	let sortBy: string = 'Deal Rating';
	let desc: number = 0;
	let selectedValue: string = 'Deal Rating';

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

		await goto(`${$page.url.href}`);
		await invalidateAll();
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
				</select>
			</div>
		</div>
	</div>

	<table class="deals-table">
		<thead>
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
		</thead>
		<tbody>
			{#each data.deals as deal}
				<tr>
					<td>
						<img src={cheapSharkStoreLogoLink + (Number(deal.storeID) - 1) + '.png'} alt="" />
					</td>
					<td>
						{Math.round(Number(deal.savings))}%
					</td>
					<td>
						${deal.salePrice}
						{#if deal.isOnSale === '1'}
							<s>${deal.normalPrice}</s>
						{/if}
					</td>
					<td>
						<a href={cheapSharkDealLink + deal.dealID}>{deal.title}</a>
					</td>
					<td>
						{deal.dealRating}
					</td>
					<td>
						<DealLastChange time={new Date(deal.lastChange * 1000)} />
					</td>
				</tr>
			{:else}
				Loading....
			{/each}
		</tbody>
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
	}

	.hidden {
		display: none;
	}

	td > img {
		display: inline;
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
		width: 90%;
		margin: 50px auto;
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

	.deals-table {
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		margin: 25px 0;
		font-size: 0.9em;
		min-width: 400px;
		background-color: var(--tertiary-color);
	}

	.deals-table thead tr {
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
		padding-bottom: 12px;
		padding-top: 12px;
		padding-left: 10px;
	}

	.deals-table tbody tr {
		border-bottom: 1px solid #fff;
	}

	.deals-table tbody tr:last-of-type {
		border-bottom: 2px solid var(--secondary-color);
	}

	.deals-table thead th:nth-child(1),
	.deals-table thead th:nth-child(2),
	.deals-table thead th:nth-child(3),
	.deals-table thead th:nth-child(5),
	.deals-table thead th:nth-child(6) {
		width: 12%;
	}

	.deals-table thead th:nth-child(4) {
		width: fit-content;
	}

	.deals-table td s {
		margin: 10px 10px;
		font-size: 11px;
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

	.deals-table a {
		text-decoration: none;
		color: #000;
	}

	.deals-table a:hover {
		color: var(--accent-color);
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

	@media only screen and (max-width: 760px),
		(min-device-width: 768px) and (max-device-width: 1024px) {
		.container {
			width: 100%;
		}
		.deals-table,
		.deals-table thead,
		.deals-table tbody,
		.deals-table th,
		.deals-table td,
		.deals-table tr {
			display: block;
		}

		.deals-table thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

		.deals-table tr {
			margin: 0 0 1rem 0;
		}

		.deals-table tr:nth-child(odd),
		.deals-table tr:nth-child(odd) a {
			background: var(--secondary-color);
			color: var(--primary-text-color);
		}

		.deals-table td {
			border: none;
			border-bottom: 1px solid #eee;
			position: relative;
			padding-left: 50%;
		}

		.deals-table td:before {
			position: absolute;
			top: 0;
			left: 6px;
			width: 45%;
			padding-right: 10px;
			white-space: nowrap;
		}

		.deals-table td:nth-of-type(1):before {
			content: 'Store';
		}
		.deals-table td:nth-of-type(2):before {
			content: 'Savings';
		}
		.deals-table td:nth-of-type(3):before {
			content: 'Price';
		}
		.deals-table td:nth-of-type(4):before {
			content: 'Title';
		}
		.deals-table td:nth-of-type(5):before {
			content: 'Deal Rating';
		}
		.deals-table td:nth-of-type(6):before {
			content: 'Last change';
		}

		.filtering {
			margin-left: 0.5rem;
		}

		.hidden {
			display: block;
		}
	}
</style>
