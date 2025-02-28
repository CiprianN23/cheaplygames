<script lang="ts" setup>
import type { GameDeal } from '~/shared/types/deals';

const { storeid } = defineProps(['storeid']);

const { data } = await useFetch<GameDeal[]>(`/api/storedeal/${storeid}`);
</script>

<template>
	<div class="card-wrapper">
		<div class="banner">
			<NuxtImg class="image" format="webp" width="64" height="64" quality="80"
				:src="`/storelogos/${storeid - 1}.png`" :placeholder="[64, 64, 20, 5]" />
		</div>
		<div class="deals-wrapper">
			<StoreDeal v-for="deal in data" :deal="deal" />
			<NuxtLink :to="`/browse?storeID=${storeid}`" class="btn">View all deals</NuxtLink>
		</div>
	</div>
</template>


<style scoped>
.image {
	display: inline;
	max-width: 100%;
	max-height: 100%;
	height: 64px;
	width: 64px;
}

.card-wrapper {
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