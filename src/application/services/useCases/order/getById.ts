import { OrderBaseModel } from '../../../../data/entities/order';
import { UseCase } from '../../../base/use-case';
import { OrderService } from '../../entities/order';

export class getByIdUseCase implements UseCase<any, OrderBaseModel | null> {
    private _OrderService: OrderService;
  
    constructor() {
      this._OrderService = new OrderService();
    }
  
    public async execute(params: any): Promise<OrderBaseModel | null> {
      const result = await this._OrderService.getById(parseInt(params, 10));
      console.log('useCase: ', result);
      return result;
    }
  }