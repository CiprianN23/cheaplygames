const formatter = new Intl.RelativeTimeFormat('en', {
	numeric: 'auto',
});

const DIVISIONS = [
	{ amount: 60, name: 'seconds' },
	{ amount: 60, name: 'minutes' },
	{ amount: 24, name: 'hours' },
	{ amount: 7, name: 'days' },
	{ amount: 4.34524, name: 'weeks' },
	{ amount: 12, name: 'months' },
	{ amount: Number.POSITIVE_INFINITY, name: 'years' },
];

function formatTimeAgo(date) {
	let duration = (date - new Date()) / 1000;

	for (let i = 0; i <= DIVISIONS.length; i++) {
		const division = DIVISIONS[i];
		if (Math.abs(duration) < division.amount) {
			return formatter.format(Math.round(duration), division.name);
		}
		duration /= division.amount;
	}
}

let cheapSharkApiLink =
  'https://www.cheapshark.com/api/1.0/deals?pageSize=15';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('storeID')) {
	cheapSharkApiLink += '&storeID=' + urlParams.get('storeID');
}

const dealsResponse = await fetch(cheapSharkApiLink);
const dealsData = await dealsResponse.json();

//let maxPages = responseData.headers.get("x-total-page-count");
const cheapSharkStoreLogoLink = 'https://cheapshark.com/img/stores/icons/';
const cheapSharkDealLink = 'https://www.cheapshark.com/redirect?dealID=';

const dealsTableBody = document.querySelector('#deals-table tbody');

for (let i = 0; i < dealsData.length; i++) {
	const currentTableRow = document.createElement('tr');
	dealsTableBody.appendChild(currentTableRow);

	const logoTd = document.createElement('td');
		
	const storeLogo = document.createElement('img');
	storeLogo.src =
    cheapSharkStoreLogoLink + (Number(dealsData[i].storeID) - 1) + '.png';
	logoTd.appendChild(storeLogo);
	currentTableRow.appendChild(logoTd);

	const savingsTd = document.createElement('td');
	savingsTd.innerText = Math.round(Number(dealsData[i].savings)) + '%';
	currentTableRow.appendChild(savingsTd);

	const priceTd = document.createElement('td');
	priceTd.innerText = '$' + dealsData[i].salePrice;
	const oldPrice = document.createElement('s');
	oldPrice.innerText = '$' + dealsData[i].normalPrice;
	priceTd.appendChild(oldPrice);
	currentTableRow.appendChild(priceTd);

	const titleTd = document.createElement('td');
	const dealLink = document.createElement('a');
	dealLink.href = cheapSharkDealLink + dealsData[i].dealID;
	dealLink.innerText = dealsData[i].title;
	titleTd.appendChild(dealLink);
	currentTableRow.appendChild(titleTd);

	const dealRatingTd = document.createElement('td');
	dealRatingTd.innerText = dealsData[i].dealRating;
	currentTableRow.appendChild(dealRatingTd);

	const recentTd = document.createElement('td');
	const recentDate = new Date(dealsData[i].lastChange * 1000);
	recentTd.innerText = formatTimeAgo(recentDate);
	currentTableRow.appendChild(recentTd);
}
