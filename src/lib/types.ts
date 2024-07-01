export type GameDeal = {
	internalName: string;
	title: string;
	metacriticLink: string;
	dealID: string;
	storeID: string;
	gameID: string;
	salePrice: string;
	normalPrice: string;
	isOnSale: string;
	savings: string;
	metacriticScore: string;
	steamRatingText: string;
	steamRatingPercent: string;
	steamRatingCount: string;
	steamAppID: string;
	releaseDate: number;
	lastChange: number;
	dealRating: string;
	thumb: string;
};

type Image = {
	banner: string;
	logo: string;
	icon: string;
};

export type GameStore = {
	storeID: string;
	storeName: string;
	isActive: number;
	images: Image;
};
