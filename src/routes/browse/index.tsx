import {
    Resource,
    component$,
    useResource$,
    useSignal,
    $,
} from '@builder.io/qwik';
import { type DocumentHead, useLocation, useNavigate } from '@builder.io/qwik-city';
import { DealLastChange } from '~/components/deallastchange/deallastchange';
import type GameDeal from '~/interfaces/GameDeal';
import { useGameStores } from '../layout';

export default component$(() => {
    const loc = useLocation();
    const nav = useNavigate();

    const storeID = loc.url.searchParams.get('storeID');

    const title = useSignal('');
    const sortBy = useSignal('Deal Rating');
    const desc = useSignal(0);
    const currentPage = useSignal(0);
    const selectedValue = useSignal('Deal Rating');

    const gameStores = useGameStores();

    const maxPage = useSignal<string | null>('200');
    const isDisabled = useSignal(false);

    const iconsLink = '/stores/icons/';
    const cheapSharkDealLink = 'https://www.cheapshark.com/redirect?dealID=';

    const refreshDeals = $(async () => {
        isDisabled.value = true;
        const newUrl = new URL(loc.url.href);

        if (currentPage.value) {
            newUrl.searchParams.set('pageNumber', currentPage.value.toString());
        } else {
            newUrl.searchParams.delete('pageNumber');
        }

        if (storeID) {
            newUrl.searchParams.set('storeID', storeID);
        } else {
            newUrl.searchParams.delete('storeID');
        }

        if (sortBy.value) {
            newUrl.searchParams.set('sortBy', sortBy.value);
        }

        if (sortBy.value === 'Deal Rating') {
            newUrl.searchParams.delete('sortBy');
        }

        if (title.value && title.value !== '') {
            newUrl.searchParams.set('title', title.value);
        } else {
            newUrl.searchParams.delete('title');
        }

        await nav(newUrl.href);
    });

    const gameDeals = useResource$<GameDeal[]>(async ({ track, cleanup }) => {
        track(() => loc.url.searchParams);

        const controller = new AbortController();
        cleanup(() => controller.abort());

        const paramStoreID = loc.url.searchParams.get('storeID');
        const paramPageNumber = loc.url.searchParams.get('pageNumber');
        const paramSortBy = loc.url.searchParams.get('sortBy');
        const paramTitle = loc.url.searchParams.get('title');

        const apiLink = new URL('https://www.cheapshark.com/api/1.0/deals?pageSize=15');

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

        const response = await fetch(apiLink, {
            signal: controller.signal,
            headers: {
                'Cache-Control': 'max-age=300',
            },
        });

        if (!response.ok){
            controller.abort();
        }

        const data = await response.json();

        maxPage.value = response.headers.get('x-total-page-count');
        isDisabled.value = false;

        return data;
    });

    return (
        <>
            <div class="container">
                <div class="filtering">
                    <div>
                        <input placeholder="Search" type="search" name="title" bind:value={title} />
                        <button>Show</button>

                        <div class="hidden">
                            <label for="orderBy">Sort: </label>
                            <select
                                name="orderBy"
                                id="orderBy"
                                bind:value={selectedValue}
                                onChange$={() => (sortBy.value = selectedValue.value)}>
                                <option value="Price">Price: lowest</option>
                                <option value="Deal Rating" selected> Best Deals </option>
                                <option value="Title">A-Z</option>
                                <option value="Savings">Savings</option>
                                <option value="recent">Last Change</option>
                            </select>
                        </div>
                    </div>
                </div>

                <table class="deals-table">
                    <thead>
                        <tr>
                            <th
                                onClick$={[$(() => (sortBy.value = 'Store')), refreshDeals]}
                                class={{
                                    headerSortDown: desc.value === 0 && sortBy.value === 'Store',
                                    headerSortUp: desc.value === 1 && sortBy.value === 'Store',
                                }}
                            >
                                Store
                            </th>
                            <th
                                onClick$={[$(() => (sortBy.value = 'Savings')), refreshDeals]}
                                class={{
                                    headerSortDown: desc.value === 0 && sortBy.value === 'Savings',
                                    headerSortUp: desc.value === 1 && sortBy.value === 'Savings',
                                }}
                            >
                                Savings
                            </th>
                            <th
                                onClick$={[$(() => (sortBy.value = 'Price')), refreshDeals]}
                                class={{
                                    headerSortDown: desc.value === 0 && sortBy.value === 'Price',
                                    headerSortUp: desc.value === 1 && sortBy.value === 'Price',
                                }}
                            >
                                Price
                            </th>
                            <th
                                onClick$={[$(() => (sortBy.value = 'Title')), refreshDeals]}
                                class={{
                                    headerSortDown: desc.value === 0 && sortBy.value === 'Title',
                                    headerSortUp: desc.value === 1 && sortBy.value === 'Title',
                                }}
                            >
                                Title
                            </th>
                            <th
                                onClick$={[$(() => (sortBy.value = 'Deal Rating')), refreshDeals]}
                                class={{
                                    headerSortDown:
                                        desc.value === 0 && sortBy.value === 'Deal Rating',
                                    headerSortUp:
                                        desc.value === 1 && sortBy.value === 'Deal Rating',
                                }}
                            >
                                Deal Rating
                            </th>
                            <th
                                onClick$={[$(() => (sortBy.value = 'recent')), refreshDeals]}
                                class={{
                                    headerSortDown: desc.value === 0 && sortBy.value === 'recent',
                                    headerSortUp: desc.value === 1 && sortBy.value === 'recent',
                                }}
                            >
                                Recent
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Resource
                            value={gameDeals}
                            onPending={() => <>Loading....</>}
                            onRejected={() => <p>Failed to load data</p>}
                            onResolved={(deals) => (
                                <>
                                    {deals.map((deal) => (
                                        <tr key={deal.dealID}>
                                            <td data-cell="store">
                                                <img
                                                    src={
                                                        iconsLink +
                                                        (Number(deal.storeID) - 1) +
                                                        '.webp'
                                                    }
                                                    alt={
                                                        gameStores.value[Number(deal.storeID) - 1]
                                                            .storeName
                                                    }
                                                    title={
                                                        gameStores.value[Number(deal.storeID) - 1]
                                                            .storeName
                                                    }
                                                    width={16}
                                                    height={16}
                                                />
                                            </td>
                                            <td data-cell="savings">
                                                {Math.round(Number(deal.savings))}%
                                            </td>
                                            <td data-cell="price">
                                                <span>
                                                    ${deal.salePrice}
                                                    {deal.isOnSale === '1' && (
                                                        <s>${deal.normalPrice}</s>
                                                    )}
                                                </span>
                                            </td>
                                            <td data-cell="title">
                                                <a href={cheapSharkDealLink + deal.dealID}>
                                                    {deal.title}
                                                </a>
                                            </td>
                                            <td data-cell="deal rating">{deal.dealRating}</td>
                                            <td data-cell="last change">
                                                <DealLastChange
                                                    time={new Date(deal.lastChange * 1000)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        />
                    </tbody>
                </table>

                <nav>
                    <p class="page">
                        Page {currentPage.value + 1} of {Number(maxPage.value) + 1}
                    </p>
                    <ul class="pagination" id="pagination">
                        {currentPage.value > 0 && (
                            <>
                                <li>
                                    <button
                                        disabled={isDisabled.value}
                                        class={{ disabled: isDisabled.value }}
                                        onClick$={async () => {
                                            currentPage.value -= 1;
                                            await refreshDeals();
                                            document.body.scrollIntoView();
                                        }}
                                    >
                                        &#8592; Prev
                                    </button>
                                </li>
                            </>
                        )}
                        {currentPage.value < Number(maxPage.value) && (
                            <>
                                <li>
                                    <button
                                        disabled={isDisabled.value}
                                        class={{ disabled: isDisabled.value }}
                                        onClick$={async () => {
                                            currentPage.value += 1;
                                            await refreshDeals();
                                            document.body.scrollIntoView();
                                        }}
                                    >
                                        {' '}
                                        Next &rarr;
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'CheaplyGames - Browse',
    meta: [
        {
            name: 'description',
            content: 'Browse and filter on going game deals from different online game stores',
        },
    ],
};
