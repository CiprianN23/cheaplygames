<script lang="ts" setup>
import type { ApiResponse, GameDeal } from '~/shared/types/deals';
const route = useRoute();
const routeQuery = computed(() => route.query)

const storeIDParam = ref(route.query.storeID ? route.query.storeID : undefined)
let title = ref<string>();
let sortBy = ref('Deal Rating');
let desc = ref<number>();
let currentPage = ref<number>(0);
let selectedValue = ref('Deal Rating');
let isDisabled = ref(false);

const { data, refresh } = await useFetch<ApiResponse>(`/api/browsedeals`, { query: routeQuery });

async function refreshDeals() {
	await navigateTo({
		path: '/browse',
		force: true,
		replace: true,
		query: {
			storeID: storeIDParam.value,
			title: title.value,
			sortBy: sortBy.value,
			desc: desc.value,
			pageNumber: currentPage.value,
		}
	});
	await refresh();
}
</script>

<template>
	<div class="table-wrapper">
		<div class="wrapper-search">
			<div>
				<form>
					<SearchField label="Game Title" name="title" :value="title" />
					<button class="search-button" @click="refreshDeals()">Show</button>
				</form>
			</div>
		</div>

		<table>
			<thead>
				<tr>
					<th @click="sortBy = 'Store', desc = desc === 0 ? 1 : 0, refreshDeals()"
						:class="{ headerSortDown: desc === 0 && sortBy === 'Store', headerSortUp: desc === 1 && sortBy === 'Store' }">
						Store
					</th>
					<th @click="sortBy = 'Savings', desc = desc === 0 ? 1 : 0, refreshDeals()"
						:class="{ headerSortDown: desc === 0 && sortBy === 'Savings', headerSortUp: desc === 1 && sortBy === 'Savings' }">
						Savings
					</th>
					<th @click="sortBy = 'Price', desc = desc === 0 ? 1 : 0, refreshDeals()"
						:class="{ headerSortDown: desc === 0 && sortBy === 'Price', headerSortUp: desc === 1 && sortBy === 'Price' }">
						Price
					</th>
					<th @click="sortBy = 'Title', desc = desc === 0 ? 1 : 0, refreshDeals()"
						:class="{ headerSortDown: desc === 0 && sortBy === 'Title', headerSortUp: desc === 1 && sortBy === 'Title' }">
						Title
					</th>
					<th @click="sortBy = 'Deal Rating', desc = desc === 0 ? 1 : 0, refreshDeals()"
						:class="{ headerSortDown: desc === 0 && sortBy === 'Deal Rating', headerSortUp: desc === 1 && sortBy === 'Deal Rating' }">
						Deal Rating
					</th>
					<th @click="sortBy = 'Recent', desc = desc === 0 ? 1 : 0, refreshDeals()"
						:class="{ headerSortDown: desc === 0 && sortBy === 'Recent', headerSortUp: desc === 1 && sortBy === 'Recent' }">
						Recent
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="deal in data?.data" :key="deal.dealID">
					<td data-cell="store">
						<NuxtImg format="webp" width="16" height="16" quality="80"
							:src="`/storeicons/${Number(deal.storeID) - 1}.png`" :placeholder="[16, 16, 20, 5]" />
					</td>
					<td data-cell="savings">
						{{ Math.round(Number(deal.savings)) }}%
					</td>
					<td data-cell="price">
						<span>
							${{ deal.salePrice }}
							<s v-if="deal.isOnSale === '1'">${{ deal.normalPrice }}</s>
						</span>
					</td>
					<td data-cell="title">
						<NuxtLink :to="`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`">
							{{ deal.title }}
						</NuxtLink>
					</td>
					<td data-cell="deal rating">{{ deal.dealRating }}</td>
					<td data-cell="last change">
						<DealLastChanged :time="new Date(deal.lastChange * 1000)" />
					</td>
				</tr>
			</tbody>
		</table>

		<nav>
			<p class="page-count">
				Page {{ currentPage + 1 }} of {{ Number(data?.totalPages) + 1 }}
			</p>
			<ul id="pagination">
				<li v-if="currentPage > 0">
					<button :disabled=isDisabled :class="{ disabled: isDisabled }"
						@click="(isDisabled = true), currentPage--, refreshDeals(), (isDisabled = false)">
						&#8592; Prev
					</button>
				</li>

				<li v-if="currentPage < Number(data?.totalPages)">
					<button :disabled=isDisabled :class="{ disabled: isDisabled }"
						@click="(isDisabled = true), currentPage++, refreshDeals(), (isDisabled = false)">
						{{ ' ' }}
						Next &rarr;
					</button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style scoped>
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

.table-wrapper {
	width: min(900px, 100% - 3rem);
	margin-inline: auto;
}

.wrapper-search {
	display: flex;
	color: var(--text);
}

.search-button {
	cursor: pointer;
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