import { getByIdUseCase } from '../../application/services/useCases/order/getById';
import { OrderInputModel } from '../../application/domain/order';
import { getAllUseCase } from '../../application/services/useCases/order/getAll';
import { OrderBaseModel } from '../../data/entities/order';

export class OrderController {
    async getAll(): Promise<Array<OrderBaseModel | null> | null> {
      const useCase = new getAllUseCase();
      const data = useCase.execute(null);
      return data;
    }
  
    async getById(id: any): Promise<OrderBaseModel | null> {
      const useCase = new getByIdUseCase();
      const data = useCase.execute(id);
      console.log(data);
      return data;
    }
  }