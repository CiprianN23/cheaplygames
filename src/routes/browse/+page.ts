import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	let storeID = url.searchParams.get('storeID');
	let pageNumber = url.searchParams.get('pageNumber');
	let sortBy = url.searchParams.get('sortBy');
	let title = url.searchParams.get('title');
	let res;

	let apiLink: string = 'https://www.cheapshark.com/api/1.0/deals?pageSize=15';

	if (storeID) {
		apiLink = apiLink.concat(`&storeID=${storeID}`);
	}

	if (pageNumber) {
		apiLink = apiLink.concat(`&pageNumber=${pageNumber}`);
	}

	if (sortBy) {
		apiLink = apiLink.concat(`&sortBy=${sortBy}`);
	}

	if (title) {
		apiLink = apiLink.concat(`&title=${title}`);
	}

	res = await fetch(apiLink);

	return {
		deals: res.ok && (await res.json()),
		maxPages: res.headers.get('x-total-page-count')
	};
};
