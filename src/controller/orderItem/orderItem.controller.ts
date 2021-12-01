import { OrderItemInputModel } from '../../application/domain/orderItem';
import { getAllOrderItem } from '../../application/services/useCases/orderItem/getAllOrderItem';
import { getByIdOrderItem } from '../../application/services/useCases/orderItem/getByIdOrderItem';
import { OrderItemBaseModel } from '../../data/entities/orderItem';


export class OrdenItemController {
    async getAllOrderItem(): Promise<Array<OrderItemBaseModel | null> | null> {
      // eslint-disable-next-line new-cap
      const useCase = new getAllOrderItem();
      const data = useCase.execute(null);
      return data;
    }
  
    async getByIdOrderItem(id: any): Promise<OrderItemBaseModel | null> {
      // eslint-disable-next-line new-cap
      const useCase = new getByIdOrderItem();
      const data = useCase.execute(id);
      console.log(data);
      return data;
    }
  }