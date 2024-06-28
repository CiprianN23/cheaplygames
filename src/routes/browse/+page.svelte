<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import AddTableARIA from '$lib/addtablearia.js';
	import DealLastChange from '$lib/components/DealLastChange.svelte';

	const { data } = $props();

	const storeIDParam = $page.url.searchParams.get('storeID');
	const cheapSharkDealLink = 'https://www.cheapshark.com/redirect?dealID=';

	let title = $state('');
	let sortBy = $state('Deal Rating');
	let desc = $state(0);
	let currentPage = $state(0);
	let selectedValue = $state('Deal Rating');
	let isDisabled = $state(false);

	async function refreshDeals() {
		if (currentPage) {
			$page.url.searchParams.set('pageNumber', currentPage.toString());
		} else {
			$page.url.searchParams.delete('pageNumber');
		}

		if (storeIDParam) {
			$page.url.searchParams.set('storeID', storeIDParam);
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

		if (desc === 1) {
			$page.url.searchParams.set('desc', desc.toString());
		} else {
			$page.url.searchParams.delete('desc');
		}

		await goto(`${$page.url.href}`, { invalidateAll: true });
	}

	onMount(() => {
		AddTableARIA();
	});
</script>

<svelte:head>
	<title>CheaplyGames - Browse</title>
	<meta
		name="description"
		content="Browse and filter on going game deals from different online game stores"
	/>
</svelte:head>

<div class="wrapper">
	<div class="wrapper-search">
		<div>
			<input
				class="search-input"
				placeholder="Search"
				type="search"
				name="title"
				bind:value={title}
			/>
			<button class="search-button">Show</button>

			<div class="mobile-filter">
				<label for="orderBy">Sort: </label>
				<select
					name="orderBy"
					id="orderBy"
					bind:value={selectedValue}
					onchange={() => (sortBy = selectedValue)}
				>
					<option value="Price">Price: lowest</option>
					<option value="Deal Rating" selected> Best Deals </option>
					<option value="Title">A-Z</option>
					<option value="Savings">Savings</option>
					<option value="recent">Last Change</option>
				</select>
			</div>
		</div>
	</div>

	<table>
		<thead>
			<tr>
				<th
					onclick={async () => (
						(sortBy = 'Store'), (desc = desc === 0 ? 1 : 0), await refreshDeals()
					)}
					class:headerSortDown={desc === 0 && sortBy === 'Store'}
					class:headerSortUp={desc === 1 && sortBy === 'Store'}
				>
					Store
				</th>
				<th
					onclick={async () => (
						(sortBy = 'Savings'), (desc = desc === 0 ? 1 : 0), await refreshDeals()
					)}
					class:headerSortDown={desc === 0 && sortBy === 'Savings'}
					class:headerSortUp={desc === 1 && sortBy === 'Savings'}
				>
					Savings
				</th>
				<th
					onclick={async () => (
						(sortBy = 'Price'), (desc = desc === 0 ? 1 : 0), await refreshDeals()
					)}
					class:headerSortDown={desc === 0 && sortBy === 'Price'}
					class:headerSortUp={desc === 1 && sortBy === 'Price'}
				>
					Price
				</th>
				<th
					onclick={async () => (
						(sortBy = 'Title'), (desc = desc === 0 ? 1 : 0), await refreshDeals()
					)}
					class:headerSortDown={desc === 0 && sortBy === 'Title'}
					class:headerSortUp={desc === 1 && sortBy === 'Title'}
				>
					Title
				</th>
				<th
					onclick={async () => (
						(sortBy = 'Deal Rating'), (desc = desc === 0 ? 1 : 0), await refreshDeals()
					)}
					class:headerSortDown={desc === 0 && sortBy === 'Deal Rating'}
					class:headerSortUp={desc === 1 && sortBy === 'Deal Rating'}
				>
					Deal Rating
				</th>
				<th
					onclick={async () => (
						(sortBy = 'Recent'), (desc = desc === 0 ? 1 : 0), await refreshDeals()
					)}
					class:headerSortDown={desc === 0 && sortBy === 'Recent'}
					class:headerSortUp={desc === 1 && sortBy === 'Recent'}
				>
					Recent
				</th>
			</tr>
		</thead>
		<tbody>
			{#each data.deals as deal (deal.dealID)}
				<tr>
					<td data-cell="store">
						<picture>
							<source srcset={`./storeicons/${Number(deal.storeID) - 1}.avif`} type="image/avif" />
							<source srcset={`./storeicons/${Number(deal.storeID) - 1}.webp`} type="image/avif" />
							<img
								src={`./storeicons/${Number(deal.storeID) - 1}.png`}
								alt={data.storeData[Number(deal.storeID - 1)].storeName}
								title={data.storeData[Number(deal.storeID - 1)].storeName}
								width="16"
								height="16"
							/>
						</picture>
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
						<a href={cheapSharkDealLink + deal.dealID}>
							{deal.title}
						</a>
					</td>
					<td data-cell="deal rating">{deal.dealRating}</td>
					<td data-cell="last change">
						<DealLastChange time={new Date(deal.lastChange * 1000)} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<nav>
		<p class="page-count">
			Page {currentPage + 1} of {Number(data.maxPage) + 1}
		</p>
		<ul id="pagination">
			{#if currentPage > 0}
				<li>
					<button
						disabled={isDisabled}
						class:disabled={isDisabled}
						onclick={async () => (
							(isDisabled = true), currentPage--, await refreshDeals(), (isDisabled = false)
						)}
					>
						&#8592; Prev
					</button>
				</li>
			{/if}

			{#if currentPage < Number(data.maxPage)}
				<li>
					<button
						disabled={isDisabled}
						class:disabled={isDisabled}
						onclick={async () => (
							(isDisabled = true), currentPage++, await refreshDeals(), (isDisabled = false)
						)}
					>
						{' '}
						Next &rarr;
					</button>
				</li>
			{/if}
		</ul>
	</nav>
</div>

<style>
	nav ul {
		display: flex;
		justify-content: center;
		border-top: 1px solid var(--background-lighten-10);
		margin-top: 1em;
		padding-top: 0.5rem;
		list-style: none;
	}

	nav ul li {
		margin: 0 1px;
	}

	nav button {
		color: var(--text);
		background-color: var(--accent-darken-30);
		display: block;
		padding: 0.5em 1em;
		border: 1px solid #999;
		border-radius: 0.2em;
		text-decoration: none;
	}

	nav button:hover {
		color: var(--secondary);
	}

	select {
		margin-left: 0.2rem;
		border: 1px solid var(--text);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background-color: var(--background);
		margin-top: 1rem;
	}

	table tr:nth-of-type(2n) {
		background-color: var(--background-lighten-10);
	}

	table th {
		background-color: var(--background-lighten-10);
		color: var(--text);
		font-weight: bold;
	}

	table th:hover {
		text-decoration: underline;
	}

	table th,
	td {
		padding: 1rem;
		text-align: left;
	}

	table a {
		text-decoration: underline;
		color: var(--text);
	}

	table a:hover {
		color: var(--accent);
	}

	.page-count {
		text-align: center;
		color: var(--text);
	}

	.wrapper {
		width: min(900px, 100% - 3rem);
		margin-inline: auto;
	}

	.wrapper-search {
		display: flex;
		color: var(--text);
	}

	.search-input {
		outline: 0;
		border: 0;
		height: 1.5rem;
		padding-left: 1rem;
		border-radius: 2em;
		transition: all 0.3s cubic-bezier(0, 0, 0.43, 1.49);
		transition-property: width, border-radius;
		color: var(--text);
	}

	.search-button {
		display: inline-block;
		font-weight: bold;
		padding: 0.1em 1em;
		margin: 0 0 0.3em 0;
		border: none;
		border-radius: 2em;
		text-decoration: none;
		color: var(--text);
		background-color: var(--accent-darken-30);
		text-align: center;
	}

	.mobile-filter {
		display: none;
	}

	@media (max-width: 40em) {
		.wrapper-search {
			margin-left: 0.5rem;
		}

		.mobile-filter {
			display: block;
		}

		table th {
			display: none;
		}

		table td {
			display: grid;
			gap: 0.5rem;
			grid-template-columns: 15ch auto;
			padding: 0.5rem 1rem;
		}

		table td:first-child {
			padding-top: 2rem;
		}

		table td:last-child {
			padding-bottom: 2rem;
		}

		table td::before {
			content: attr(data-cell);
			font-size: var(--fontSize300);
			font-weight: 700;
			text-transform: capitalize;
		}
	}
</style>
