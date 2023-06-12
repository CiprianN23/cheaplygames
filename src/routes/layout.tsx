import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$, type RequestHandler } from '@builder.io/qwik-city';
import { Footer } from '~/components/footer/footer';
import { NavBar } from '~/components/navbar/navbar';
import type IGameStore from '~/interfaces/GameStore';
import data from './stores-data.json';

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 300 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 300,
    });
};

export const useGameStores = routeLoader$(() => {
    return data as IGameStore[];
});

export default component$(() => {
    return (
        <>
            <NavBar />

            <Slot />

            <Footer />
        </>
    );
});
