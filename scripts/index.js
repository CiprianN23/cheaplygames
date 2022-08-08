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

	const currentStoreElement = document.getElementById('store-' + storeId);
	const cardBody = currentStoreElement.querySelector('.card-body');

	let cheapSharkRedirectLink = 'https://www.cheapshark.com/redirect?dealID=';

	const dealContainer = document.createElement('div');
	dealContainer.classList.add('deals-container');

	const viewAllButton = cardBody.querySelector('.btn');

	for (let i = 0; i < gamesData.length; i++) {
		const dealContainer = document.createElement('div');
		dealContainer.classList.add('deals-container');
		viewAllButton.before(dealContainer);

		const anotherUselessDiv = document.createElement('div');
		dealContainer.appendChild(anotherUselessDiv);

		const gameLink = document.createElement('a');
		const gameTitle = truncateString(gamesData[i].title, MAX_GAME_TITLE_LENGTH);

		gameLink.target = '_blank';
		gameLink.innerText = gameTitle;
		gameLink.href = cheapSharkRedirectLink + gamesData[i].dealID;
		anotherUselessDiv.appendChild(gameLink);

		const uselessDiv = document.createElement('div');
		dealContainer.appendChild(uselessDiv);

		if (gamesData[i].isOnSale === '1') {
			const oldPrice = document.createElement('s');
			oldPrice.innerText = '$' + gamesData[i].normalPrice;
			uselessDiv.appendChild(oldPrice);
		}

		const currentPrice = document.createElement('span');
		currentPrice.classList.add('price-highlight');
		currentPrice.innerText = '$' + gamesData[i].salePrice;
		uselessDiv.appendChild(currentPrice);
	}
}

function truncateString(str, num) {
	if (str.length > num) {
		return str.slice(0, num) + '...';
	} else {
		return str;
	}
}
