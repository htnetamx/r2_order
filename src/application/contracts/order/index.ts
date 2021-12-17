import { IBasket } from '../../../data/entities/basket';
import { OrderBaseModel } from '../../../data/entities/order';

export interface IOrderRepository {
    getAll(): Promise<Array<OrderBaseModel | null> | null>;
    getById(id: number): Promise<OrderBaseModel | null>;
    post(params: IBasket): Promise<OrderBaseModel | null>;
}