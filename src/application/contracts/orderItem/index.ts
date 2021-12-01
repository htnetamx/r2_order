import { OrderItemBaseModel } from '../../../data/entities/orderItem';

export interface IOrderItemRepository {
    getAllOrderItem(): Promise<Array<OrderItemBaseModel | null> | null>;
    getByIdOrderItem(id: number): Promise<OrderItemBaseModel | null>;
}