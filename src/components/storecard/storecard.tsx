import { component$, useResource$, Resource } from '@builder.io/qwik';
import { StoreDeal } from '../storedeal/storedeal';
import type GameDeal from '~/interfaces/GameDeal';

interface ItemProps {
    storeId: string;
    storeName: string;
}

export const StoreCard = component$<ItemProps>((props) => {
    const gameDeals = useResource$<GameDeal[]>(async ({ cleanup }) => {

        const controller = new AbortController();
        cleanup(() => controller.abort());

        const response = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?storeID=${props.storeId}&pageSize=7`, {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'max-age=300'
                }
            }
        );

        if (!response.ok) {
            controller.abort();
        }

        const data = await response.json();

        return data as GameDeal[];
    });

    return (
        <>
            <div class="card">
                <div class="card-header">
                    <img
                        src={`/stores/logos/${Number(props.storeId) - 1}.webp`}
                        alt={props.storeName}
                        width={64}
                        height={64}
                    />
                </div>
                <div class="card-body">
                    <Resource
                        value={gameDeals}
                        onPending={() => <p>Loading....</p>}
                        onRejected={() => <p>Failed to load data</p>}
                        onResolved={(deals) => (
                            <>
                                {deals.map((deal) => (
                                    <StoreDeal
                                    key={deal.dealID}
                                    dealID={deal.dealID}
                                    isOnSale={deal.isOnSale}
                                    normalPrice={deal.normalPrice}
                                    salePrice={deal.salePrice}
                                    title={deal.title}  />
                                ))}
                            </>
                        )}
                    />
                    <a href={`/browse?storeID=${props.storeId}`} class="btn">
                        View all deals
                    </a>
                </div>
            </div>
        </>
    );
});
