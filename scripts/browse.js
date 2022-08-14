import { formatTimeAgo } from './utils.js';

let currentPage = 0;

if (sessionStorage.getItem('currentPage')) {
	currentPage = Number(sessionStorage.getItem('currentPage'));
}
      
let cheapSharkApiLink =
        'https://www.cheapshark.com/api/1.0/deals?pageSize=15&onSale=1';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('storeID')) {
	cheapSharkApiLink += '&storeID=' + urlParams.get('storeID');
}

if (urlParams.has('pageNumber')) {
	cheapSharkApiLink += '&pageNumber=' + urlParams.get('pageNumber');
}

const dealsResponse = await fetch(cheapSharkApiLink);
const dealsData = await dealsResponse.json();

const maxPages = dealsResponse.headers.get('x-total-page-count');

const previousPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');

if (currentPage == 0) {
	previousPageButton.style.visibility = 'hidden';
} else {
	previousPageButton.style.visibility = 'visible';
}

if (currentPage == maxPages) {
	nextPageButton.style.visibility = 'hidden';
} else {
	nextPageButton.style.visibility = 'visible';
}

function prevPage() {
	console.log('prev');
	if (currentPage > 0) {
		currentPage--;
		sessionStorage.setItem('currentPage', currentPage);
		changePage(currentPage);
	}
}

function nextPage() {
	console.log('next');
	if (currentPage < maxPages) {
		currentPage++;
		sessionStorage.setItem('currentPage', currentPage);
		changePage(currentPage);
	}
}

function changePage(currentPage) {
	var url = new URL(location.href);
	url.searchParams.set('pageNumber', currentPage);
	window.location.replace(url.toString());
}

window.prevPage = prevPage;
window.nextPage = nextPage;

const cheapSharkStoreLogoLink = 'https://cheapshark.com/img/stores/icons/';
const cheapSharkDealLink = 'https://www.cheapshark.com/redirect?dealID=';

const dealsTableBody = document.querySelector('#deals-table tbody');

const fragment = document.createDocumentFragment();

for await (let dealData of dealsData) {
	const currentTableRow = document.createElement('tr');
	fragment.appendChild(currentTableRow);

	const logoTd = document.createElement('td');

	const storeLogo = document.createElement('img');
	storeLogo.src =
    cheapSharkStoreLogoLink + (Number(dealData.storeID) - 1) + '.png';
	logoTd.appendChild(storeLogo);
	currentTableRow.appendChild(logoTd);

	const savingsTd = document.createElement('td');
	savingsTd.innerText = Math.round(Number(dealData.savings)) + '%';
	currentTableRow.appendChild(savingsTd);

	const priceTd = document.createElement('td');
	priceTd.innerText = '$' + dealData.salePrice;
	const oldPrice = document.createElement('s');
	oldPrice.innerText = '$' + dealData.normalPrice;
	priceTd.appendChild(oldPrice);
	currentTableRow.appendChild(priceTd);

	const titleTd = document.createElement('td');
	const dealLink = document.createElement('a');
	dealLink.href = cheapSharkDealLink + dealData.dealID;
	dealLink.innerText = dealData.title;
	titleTd.appendChild(dealLink);
	currentTableRow.appendChild(titleTd);

	const dealRatingTd = document.createElement('td');
	dealRatingTd.innerText = dealData.dealRating;
	currentTableRow.appendChild(dealRatingTd);

	const recentTd = document.createElement('td');
	const recentDate = new Date(dealData.lastChange * 1000);
	recentTd.innerText = formatTimeAgo(recentDate);
	currentTableRow.appendChild(recentTd);
}

dealsTableBody.appendChild(fragment);