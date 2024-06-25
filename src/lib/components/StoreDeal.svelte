<script lang="ts">
	import type { GameDeal } from '$lib/types';

	let { dealData } = $props<{
		dealData: GameDeal;
	}>();

	const cheapSharkRedirectLink = 'https://www.cheapshark.com/redirect?dealID=';
	const MAX_GAME_TITLE_LENGTH = 18;

	function truncateString(str: string, num: number) {
		if (str.length > num) {
			return str.slice(0, num) + '...';
		} else {
			return str;
		}
	}
</script>

<div class="wrapper">
	<div class="game-title">
		<a href={cheapSharkRedirectLink + dealData.dealID} target="_blank" rel="noreferrer">
			{truncateString(dealData.title, MAX_GAME_TITLE_LENGTH)}
		</a>
	</div>
	<div>
		{#if dealData.isOnSale === '1'}
			<s>${dealData.normalPrice}</s>
		{/if}

		<span>${dealData.salePrice}</span>
	</div>
</div>

<style>
	a {
		text-decoration: none;
		color: var(--text);
		font-size: var(--fontSize300);
	}

	a:hover {
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

	.wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin: 25px 0px;
	}

	.wrapper > div {
		text-align: left;
		padding: 0px 10px;
	}
</style>
