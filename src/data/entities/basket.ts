import { IBasketItem } from "./basketItem";

export interface IBasket {
    customerId: number;
    //addressId: number;
    storeId: number;
    discountCoupon: string;
    items: Array<IBasketItem>;
  }