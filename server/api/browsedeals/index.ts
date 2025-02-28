import { GameDeal } from "~/shared/types/deals";
import type { H3Event } from "h3";

export default cachedEventHandler(
  async (event) => {
    const url = getRequestURL(event);

    const paramStoreID = url.searchParams.get("storeID");
    const paramPageNumber = url.searchParams.get("pageNumber");
    const paramSortBy = url.searchParams.get("sortBy");
    const paramTitle = url.searchParams.get("title");
    const paramDesc = url.searchParams.get("desc");

    const apiLink = new URL(
      "https://www.cheapshark.com/api/1.0/deals?pageSize=15&onSale=1"
    );

    if (paramStoreID) {
      apiLink.searchParams.set("storeID", paramStoreID);
    }

    if (paramPageNumber) {
      apiLink.searchParams.set("pageNumber", paramPageNumber.toString());
    }

    if (paramSortBy) {
      apiLink.searchParams.set("sortBy", paramSortBy);
    }

    if (paramTitle) {
      apiLink.searchParams.set("title", paramTitle);
    }

    if (paramDesc) {
      apiLink.searchParams.set("desc", paramDesc);
    }

    const response = await $fetch.raw<GameDeal[]>(apiLink.toString());
    const totalPages = parseInt(
      response.headers.get("x-total-page-count") || "0",
      10
    );

    return {
      data: response._data?.map((deal) => ({
        title: deal.title,
        dealID: deal.dealID,
        storeID: deal.storeID,
        salePrice: deal.salePrice,
        normalPrice: deal.normalPrice,
        isOnSale: deal.isOnSale,
        savings: deal.savings,
        lastChange: deal.lastChange,
        dealRating: deal.dealRating,
      })),
      totalPages,
    };
  },
  {
    maxAge: 60 * 60,
    getKey: (event: H3Event) => event.path,
  }
);
