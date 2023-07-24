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
    const MAX_GAME_TITLE_LENGTH = 18;

    function truncateString(str: string, num: number) {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    }

    return (
        <>
            <div class="display:flex flex-direction:row flex-wrap:nowrap justify-content:space-between margin:25px_0px [div]{text-align:left;padding:0px_10px}">
                <div class="game-title">
                    <a
                        class="text-decoration:none color:$text hover:color:$accent font-size:$fontSize300"
                        href={cheapSharkRedirectLink + props.dealID}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {truncateString(props.title, MAX_GAME_TITLE_LENGTH)}
                    </a>
                </div>
                <div>
                    {props.isOnSale === '1' && <s>${props.normalPrice}</s>}

                    <span class="color:$text_!important background-color:$primary padding:3px border:1px_solid_$text border-radius:5px margin-left:5px font-weight:700">${props.salePrice}</span>
                </div>
            </div>
        </>
    );
});
