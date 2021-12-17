export interface IBasketItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    maxQuantity?: number;
    minQuantity?: number;
    pictureUrl: string;
  }