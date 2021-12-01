import { OrderItemBaseModel } from '../../../../data/entities/orderItem';
import { UseCase } from '../../../base/use-case';
import { OrderItemService } from '../../entities/orderItem';

export class getByIdOrderItem implements UseCase<any, OrderItemBaseModel | null> {
    private _OrderItemService: OrderItemService;
  
    constructor() {
      this._OrderItemService = new OrderItemService();
    }
  
    public async execute(params: any): Promise<OrderItemBaseModel | null> {
      const result = await this._OrderItemService.getByIdOrderItem(parseInt(params, 10));
      console.log('useCase: ', result);
      return result;
    }
  }