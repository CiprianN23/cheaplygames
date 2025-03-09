import type { GameDeal } from "~/shared/types/deals";
import type { H3Event } from "h3";

export default defineCachedEventHandler(
  async (event) => {
    const storeId = getRouterParam(event, "id");

    if (!storeId) {
      throw createError({ statusCode: 400, message: "No store id provided" });
    }

    const result = await $fetch<GameDeal[]>(
      `https://www.cheapshark.com/api/1.0/deals?storeID=${storeId}&pageSize=7`
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
    getKey: (event: H3Event) => event.path,
  }
);
