<script lang="ts" setup>
import type { GameDeal } from '~/shared/types/deals';

const { deal } = defineProps<{ deal: GameDeal }>()

const MAX_GAME_TITLE_LENGTH = 18;

function truncateString(str: string, num: number) {
	if (str.length > num) {
		return str.slice(0, num) + '...';
	} else {
		return str;
	}
}

const gameTitle = truncateString(deal.title, MAX_GAME_TITLE_LENGTH);
</script>

<template>
	<div class="deal-wrapper">
		<div class="game-title">
			<NuxtLink class="link" :to="`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`" external>
				{{ gameTitle }}
			</NuxtLink>
		</div>
		<div>
			<s v-if="deal.isOnSale === '1'">{{ deal.normalPrice }}</s>

			<span>{{ deal.salePrice }}</span>
		</div>
	</div>
</template>

<style scoped>
.link {
	text-decoration: none;
	color: var(--text);
	font-size: var(--fontSize300);
}

.link:hover {
	color: var(--accent);
}

span {
	color: var(--text) !important;
	background-color: var(--primary);
	padding: 3px;
	border: 1px solid var(--text);
	border-radius: 5px;
	margin-left: 5px;
	font-weight: 700;
}

.deal-wrapper {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin: 25px 0px;
}

.deal-wrapper>div {
	text-align: left;
	padding: 0px 10px;
}
</style>