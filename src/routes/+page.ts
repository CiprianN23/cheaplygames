import type { PageLoad } from './$types';
import stores from '$lib/data/gamestores.json';

export const load: PageLoad = () => {
	return {
		storeData: stores
	};
};
