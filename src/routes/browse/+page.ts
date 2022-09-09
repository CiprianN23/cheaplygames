import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	let storeID = url.searchParams.get('storeID');
	let res;

	if (storeID === null) {
		res = await fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=15');
	} else {
		res = await fetch(`https://www.cheapshark.com/api/1.0/deals?pageSize=15&storeID=${storeID}`);
	}

	return {
		deals: res.ok && (await res.json()),
		maxPages: res.headers.get('x-total-page-count')
	};
};
