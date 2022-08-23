<script lang="ts">
  export let dealData: any;

  let cheapSharkRedirectLink = "https://www.cheapshark.com/redirect?dealID=";
  const MAX_GAME_TITLE_LENGTH = 22;

  function truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }
</script>

<div class="deal-container">
  <div class="game-title">
    <a href={cheapSharkRedirectLink + dealData.dealID} target="_blank"
      >{truncateString(dealData.title, MAX_GAME_TITLE_LENGTH)}</a
    >
  </div>
  <div class="prices">
    {#if dealData.isOnSale === "1"}
      <s>${dealData.normalPrice}</s>
    {/if}

    <span class="price-highlight">${dealData.salePrice}</span>
  </div>
</div>

<style>
  .deal-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 25px 0px;
  }

  .game-title a {
    text-decoration: underline;
    text-decoration-style: dotted;
    color: #000;
  }

  .game-title a:hover {
    color: var(--accent-color);
  }

  .deal-container > div {
    text-align: left;
    padding: 0px 10px;
  }

  .price-highlight {
    color: var(--secondary-text-color) !important;
    background-color: var(--accent-color);
    padding: 3px;
    border: 1px solid #909090;
    border-radius: 5px;
    margin-left: 5px;
    font-weight: bold;
  }
</style>
