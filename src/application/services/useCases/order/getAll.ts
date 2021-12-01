import { OrderBaseModel } from '../../../../data/entities/order';
import { UseCase } from '../../../base/use-case';
import { OrderService } from '../../entities/order';

export class getAllUseCase
  implements UseCase<any, Array<OrderBaseModel | null> | null>
{
  private _OrderService: OrderService;

  constructor() {
    this._OrderService = new OrderService();
  }

  public async execute(
    params: any
  ): Promise<Array<OrderBaseModel | null> | null> {
    const result = await this._OrderService.getAll();
    return result;
  }
}
