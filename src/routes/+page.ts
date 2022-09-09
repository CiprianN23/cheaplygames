import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://www.cheapshark.com/api/1.0/stores');
	return {
		stores: res.ok && (await res.json())
	};
};
