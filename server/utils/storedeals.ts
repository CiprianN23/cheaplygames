import { GameDeal } from "~/shared/types/deals";
import type { H3Event } from "h3";

export const getStoreDeals = defineCachedFunction(
  async (event: H3Event, id: string) => {
    const result = await $fetch<GameDeal[]>(
      `https://www.cheapshark.com/api/1.0/deals?storeID=${id}&pageSize=7`
    );

    return result.map((deal) => ({
      title: deal.title,
      dealID: deal.dealID,
      salePrice: deal.salePrice,
      normalPrice: deal.normalPrice,
      isOnSale: deal.isOnSale,
    }));
  },
  {
    maxAge: 60 * 60,
    name: "gsDeals",
    getKey: (event: H3Event, id: string) => id,
  }
);
