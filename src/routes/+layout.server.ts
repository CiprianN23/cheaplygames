import type { LayoutServerLoad } from "./$types";

export const load = (async ({fetch}) => {
    const res = await fetch('https://www.cheapshark.com/api/1.0/stores');
    const data = await res.json();
    console.log(data);
    return {
        gameStores: data
    };
}) satisfies LayoutServerLoad;