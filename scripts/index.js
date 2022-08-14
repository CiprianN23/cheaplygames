import { truncateString } from './utils.js';

const MAX_GAME_TITLE_LENGTH = 25;

const storeElements = document.querySelectorAll('div[id^="store-"]');
storeElements.forEach((element) => {
	const storeId = element.id.substring(element.id.indexOf('-') + 1);
	getTopDealsByStore(storeId);
});

async function getTopDealsByStore(storeId) {
	const gamesResponse = await fetch(
		`https://www.cheapshark.com/api/1.0/deals?storeID=${storeId}&pageSize=7`
	);
	const gamesData = await gamesResponse.json();
	console.log(gamesData);

	const currentStoreElement = document.getElementById('store-' + storeId);
	const cardBody = currentStoreElement.querySelector('.card-body');

	let cheapSharkRedirectLink = 'https://www.cheapshark.com/redirect?dealID=';

	const dealContainer = document.createElement('div');
	dealContainer.classList.add('deals-container');

	const viewAllButton = cardBody.querySelector('.btn');

	for await (let gameData of gamesData) {
		const dealContainer = document.createElement('div');
		dealContainer.classList.add('deals-container');
		viewAllButton.before(dealContainer);

		const anotherUselessDiv = document.createElement('div');
		dealContainer.appendChild(anotherUselessDiv);

		const gameLink = document.createElement('a');
		const gameTitle = truncateString(gameData.title, MAX_GAME_TITLE_LENGTH);

		gameLink.target = '_blank';
		gameLink.innerText = gameTitle;
		gameLink.href = cheapSharkRedirectLink + gameData.dealID;
		anotherUselessDiv.appendChild(gameLink);

		const uselessDiv = document.createElement('div');
		dealContainer.appendChild(uselessDiv);

		if (gameData.isOnSale === '1') {
			const oldPrice = document.createElement('s');
			oldPrice.innerText = '$' + gameData.normalPrice;
			uselessDiv.appendChild(oldPrice);
		}

		const currentPrice = document.createElement('span');
		currentPrice.classList.add('price-highlight');
		currentPrice.innerText = '$' + gameData.salePrice;
		uselessDiv.appendChild(currentPrice);
	}
}