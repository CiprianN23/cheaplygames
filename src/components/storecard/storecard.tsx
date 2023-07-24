import { component$, useResource$, Resource } from '@builder.io/qwik';
import { StoreDeal } from '../storedeal/storedeal';
import type GameDeal from '~/interfaces/GameDeal';
import { Image } from '@unpic/qwik';

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
            <div class="border:1px_solid_#ccc margin-bottom:50px">
                <div class="text-align:center padding:25px_10px background-color:$background-lighten-10 color:$text">
                    <Image
                        class="display:inline max-width:100% max-height:100%"
                        layout="constrained"
                        src={`https://www.cheapshark.com/img/stores/logos/${Number(props.storeId) - 1}.png`}
                        alt={props.storeName}
                        width={64}
                        height={64}
                    />
                </div>
                <div class="padding:30px_10px text-align:center font-size:$fontSize300 background-color:$background">
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
                    <a href={`/browse?storeID=${props.storeId}`} class="display:block color:$text text-align:center background-color:$background text-decoration:none margin-top:30px padding:10px_5px hover:color:$accent">
                        View all deals
                    </a>
                </div>
            </div>
        </>
    );
});
