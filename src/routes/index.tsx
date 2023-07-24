import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { StoreCard } from '~/components/storecard/storecard';
import type IGameStore from '~/interfaces/GameStore';
import { useGameStores } from './layout';

export default component$(() => {
    const visibleShops = ['1', '3', '7', '11', '15', '21', '23', '25', '27'];

    function storeIsVisible(value: IGameStore) {
        return value.isActive === 1 && visibleShops.includes(value.storeID);
    }

    const gameStores = useGameStores();

    return (
        <>
            <div class="display:grid grid-template-columns:repeat(auto-fit,minmax(361px,1fr)) grid-gap:1rem margin:2rem_auto max-width:1280px">
                {gameStores.value.filter(storeIsVisible).map((store, i) => (
                    <StoreCard key={i} storeId={store.storeID} storeName={store.storeName} />
                ))}
            </div>

            <div class="display:block color:$text text-align:center">
                Go to <Link class="text-decoration:underline color:$text" href="/browse">browse</Link> for even more deals!
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'CheaplyGames - The place to find game deals',
    meta: [
        {
            name: 'description',
            content: 'Summary of popular on going deals from popular online game stores',
        },
    ],
};
