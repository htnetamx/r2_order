import { OrderItemBaseModel } from '../../../../data/entities/orderItem';
import { UseCase } from '../../../base/use-case';
import { OrderItemService } from '../../entities/orderItem';


export class getAllOrderItem
  implements UseCase<any, Array<OrderItemBaseModel | null> | null>
{
  private _OrderItemService: OrderItemService;

  constructor() {
    this._OrderItemService = new OrderItemService();
  }

  public async execute(
    params: any
  ): Promise<Array<OrderItemBaseModel | null> | null> {
    const result = await this._OrderItemService.getAllOrderItem();
    return result;
  }
}
