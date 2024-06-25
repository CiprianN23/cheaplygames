import type { PageLoad } from './$types';
import stores from '$lib/data/gamestores.json';

export const load: PageLoad = async ({ fetch, url }) => {
	const paramStoreID = url.searchParams.get('storeID');
	const paramPageNumber = url.searchParams.get('pageNumber');
	const paramSortBy = url.searchParams.get('sortBy');
	const paramTitle = url.searchParams.get('title');
	const paramDesc = url.searchParams.get('desc');

	const apiLink = new URL('https://www.cheapshark.com/api/1.0/deals?pageSize=15&onSale=1');

	if (paramStoreID) {
		apiLink.searchParams.set('storeID', paramStoreID);
	}

	if (paramPageNumber) {
		apiLink.searchParams.set('pageNumber', paramPageNumber.toString());
	}

	if (paramSortBy) {
		apiLink.searchParams.set('sortBy', paramSortBy);
	}

	if (paramTitle) {
		apiLink.searchParams.set('title', paramTitle);
	}

	if (paramDesc) {
		apiLink.searchParams.set('desc', paramDesc);
	}

	const response = await fetch(apiLink, {
		headers: {
			'Cache-Control': 'max-age=1200'
		}
	});

	const newDeals = await response.json();

	return {
		storeData: stores,
		deals: newDeals,
		maxPage: response.headers.get('x-total-page-count')
	};
};
