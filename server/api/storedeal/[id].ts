import { getStoreDeals } from "~/server/utils/storedeals";
import { GameDeal } from "~/shared/types/deals";

export default defineEventHandler(async (event) => {
  const storeId = getRouterParam(event, "id");

  if (!storeId) {
    throw createError({ statusCode: 400, message: "No store id provided" });
  }

  const deals = await getStoreDeals(event, storeId);
  return deals;
});
