interface Image {
    banner: string;
    logo: string;
    icon: string;
}

export default interface IGameStore {
    storeID: string;
    storeName: string;
    isActive: number;
    images: Image;
}