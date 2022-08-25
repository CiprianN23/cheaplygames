<script lang="ts">
    import type { PageData } from "./$types";
    import DealLastChange from "../../Components/DealLastChange.svelte";

    export let data: PageData;
    let isDisabled: boolean = false;

    $: deals = data.deals;

    let currentPage: number = 0;

    const cheapSharkStoreLogoLink = "https://cheapshark.com/img/stores/icons/";
    const cheapSharkDealLink = "https://www.cheapshark.com/redirect?dealID=";

    const previousPage = async () => {
        currentPage -= 1;
        isDisabled = true;
        const res = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?pageSize=15&onSale=1&pageNumber=${currentPage}`
        );
        deals = await res.json();
        isDisabled = false;
        document.body.scrollIntoView();
    };

    const nextPage = async () => {
        currentPage += 1;
        isDisabled = true;
        const res = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?pageSize=15&onSale=1&pageNumber=${currentPage}`
        );
        deals = await res.json();
        isDisabled = false;
        document.body.scrollIntoView();
    };
</script>

<div class="container">
    <table class="deals-table" id="deals-table">
        <thead>
            <tr>
                <th>Store</th>
                <th>Savings</th>
                <th>Price</th>
                <th>Title</th>
                <th>Deal Rating</th>
                <th>Last Change</th>
            </tr>
        </thead>
        <tbody>
            {#each deals as deal}
                <tr>
                    <td>
                        <img
                            src={cheapSharkStoreLogoLink +
                                (Number(deal.storeID) - 1) +
                                ".png"}
                            alt=""
                        />
                    </td>
                    <td>
                        {Math.round(Number(deal.savings))}%
                    </td>
                    <td>
                        ${deal.salePrice}
                        <s>${deal.normalPrice}</s>
                    </td>
                    <td>
                        <a href={cheapSharkDealLink + deal.dealID}
                            >{deal.title}</a
                        >
                    </td>
                    <td>
                        {deal.dealRating}
                    </td>
                    <td>
                        <DealLastChange
                            time={new Date(deal.lastChange * 1000)}
                        />
                    </td>
                </tr>
            {:else}
                Loading....
            {/each}
        </tbody>
    </table>

    <nav>
        <p class="page">Page {currentPage} of {data.maxPages}</p>
        <ul class="pagination" id="pagination">
            {#if currentPage > 0}
                <li>
                    <button disabled={isDisabled} class:disabled={isDisabled} on:click={previousPage}>&#8592; Prev</button>
                </li>
            {/if}
            {#if currentPage < Number(data.maxPages)}
                <li>
                    <button disabled={isDisabled} class:disabled={isDisabled} on:click={nextPage}>Next &rarr;</button>
                </li>
            {/if}
        </ul>
    </nav>
</div>

<style>
    .container {
        width: 90%;
        margin: 50px auto;
    }

    .disabled {
        cursor: none;
        background-color: #999 !important;
        color: var(--primary-text-color) !important;
    }

    .page {
        text-align: center;
        color: var(--primary-text-color);
        font-size: .95rem;
    }

    .deals-table {
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        min-width: 400px;
        background-color: var(--tertiary-color);
    }

    .deals-table thead tr {
        background-color: var(--secondary-color);
        color: #000;
        text-align: left;
        font-weight: bold;
    }

    .deals-table th,
    .deals-table td {
        padding-bottom: 12px;
        padding-top: 12px;
        padding-left: 10px;
    }

    .deals-table tbody tr {
        border-bottom: 1px solid #fff;
    }

    .deals-table tbody tr:last-of-type {
        border-bottom: 2px solid var(--secondary-color);
    }

    .deals-table thead th:nth-child(1),
    .deals-table thead th:nth-child(2),
    .deals-table thead th:nth-child(3),
    .deals-table thead th:nth-child(5),
    .deals-table thead th:nth-child(6) {
        width: 12%;
    }

    .deals-table thead th:nth-child(4) {
        width: fit-content;
    }

    .deals-table td s {
        margin: 10px 10px;
        font-size: 11px;
    }

    #pagination {
        display: flex;
        justify-content: center;
        border-top: 1px solid #eee;
        margin-top: 1em;
        padding-top: 0.5em;
        list-style: none;
    }

    #pagination li {
        margin: 0 1px;
    }

    #pagination button {
        color: var(--primary-text-color);
        background-color: var(--primary-color);
        display: block;
        padding: 0.5em 1em;
        border: 1px solid #999;
        border-radius: 0.2em;
        text-decoration: none;
    }

    #pagination button:hover {
        color: var(--accent-color);
    }

    .deals-table a {
        text-decoration: underline;
        text-decoration-style: dotted;
        color: #000;
    }

    .deals-table a:hover {
        color: var(--accent-color);
    }

    @media only screen and (max-width: 760px),
        (min-device-width: 768px) and (max-device-width: 1024px) {
        .container {
            width: 100%;
        }
        .deals-table,
        .deals-table thead,
        .deals-table tbody,
        .deals-table th,
        .deals-table td,
        .deals-table tr {
            display: block;
        }

        .deals-table thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
        }

        .deals-table tr {
            margin: 0 0 1rem 0;
        }

        .deals-table tr:nth-child(odd),
        .deals-table tr:nth-child(odd) a {
            background: var(--secondary-color);
            color: var(--primary-text-color);
        }

        .deals-table td {
            border: none;
            border-bottom: 1px solid #eee;
            position: relative;
            padding-left: 50%;
        }

        .deals-table td:before {
            position: absolute;
            top: 0;
            left: 6px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
        }

        .deals-table td:nth-of-type(1):before {
            content: "Store";
        }
        .deals-table td:nth-of-type(2):before {
            content: "Savings";
        }
        .deals-table td:nth-of-type(3):before {
            content: "Price";
        }
        .deals-table td:nth-of-type(4):before {
            content: "Title";
        }
        .deals-table td:nth-of-type(5):before {
            content: "Deal Rating";
        }
        .deals-table td:nth-of-type(6):before {
            content: "Last change";
        }
    }
</style>
