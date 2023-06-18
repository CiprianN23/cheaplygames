import { component$ } from '@builder.io/qwik';

interface ItemProps {
    dealID: string;
    title: string;
    isOnSale: string;
    salePrice: string;
    normalPrice: string;
}

export const StoreDeal = component$<ItemProps>((props) => {
    const cheapSharkRedirectLink = 'https://www.cheapshark.com/redirect?dealID=';
    const MAX_GAME_TITLE_LENGTH = 22;

    function truncateString(str: string, num: number) {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    }

    return (
        <>
            <div class="deal-container">
                <div class="game-title">
                    <a
                        href={cheapSharkRedirectLink + props.dealID}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {truncateString(props.title, MAX_GAME_TITLE_LENGTH)}
                    </a>
                </div>
                <div class="prices">
                    {props.isOnSale === '1' && <s>${props.normalPrice}</s>}

                    <span class="price-highlight">${props.salePrice}</span>
                </div>
            </div>
        </>
    );
});
