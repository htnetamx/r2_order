import { IBasket } from '../../../../data/entities/basket';
import { OrderBaseModel } from '../../../../data/entities/order';
import { UseCase } from '../../../base/use-case';
import { OrderService } from '../../entities/order';

export class postUseCase implements UseCase<any, OrderBaseModel | null> {
    private _OrderService: OrderService;
  
    constructor() {
      this._OrderService = new OrderService();
    }
  
    public async execute(params: IBasket): Promise<OrderBaseModel | null> {
      const result = await this._OrderService.post(params);
      console.log('useCase: ', result);
      return result;
    }
  }