import { OrderItemRepositoryMySQL } from '../../../data/db/mySQL/index';
import { OrderItemBaseModel } from '../../../data/entities/orderItem';
import { IOrderItemRepository } from '../../contracts/orderItem/index';
import {
    ServiceResponse,
    IServiceResponse,
} from '../../base';

export interface IOrderItemService {
    mySQL: IOrderItemRepository;
}

export class OrderItemService {
    public repos: IOrderItemService = {
        mySQL: new OrderItemRepositoryMySQL(),
    };

    async getAllOrderItem(): Promise<Array<OrderItemBaseModel | null> | null> {
        try {
          const promises: Array<Promise<Array<OrderItemBaseModel | null> | null>> = [];
          const entries = Object.entries(this.repos);
    
          entries.forEach((entry) =>
            promises.push((<IOrderItemRepository>entry[1]).getAllOrderItem())
          );
          let result_promises = await Promise.all(promises);
          if (result_promises.length > 0) {
            result_promises = result_promises.filter((i) => i !== null);
    
            const succeses: Array<
              IServiceResponse<Array<OrderItemBaseModel | null> | null>
            > = [];
            const errores: Array<IServiceResponse<null>> = [];
            result_promises.forEach((result, index) =>
              result == null
                ? errores.push(
                    new ServiceResponse(result, entries[index][0], index)
                  )
                : succeses.push(
                    new ServiceResponse(result, entries[index][0], index)
                  )
            );
            return errores.length > 0 ? null : result_promises[0];
          } 
            return null;
          
        } catch (error) {
          return null;
        }
      }
    
      async getByIdOrderItem(id: number): Promise<OrderItemBaseModel | null> {
        try {
          const promises: Array<Promise<OrderItemBaseModel | null>> = [];
          const entries = Object.entries(this.repos);
    
          entries.forEach((entry) =>
            promises.push((<IOrderItemRepository>entry[1]).getByIdOrderItem(id))
          );
          let result_promises = await Promise.all(promises);
    
          if (result_promises.length > 0) {
            result_promises = result_promises.filter((i) => i !== null);
            const succeses: Array<IServiceResponse<OrderItemBaseModel | null>> = [];
            const errores: Array<IServiceResponse<null>> = [];
            result_promises.forEach((result, index) =>
              result == null
                ? errores.push(
                    new ServiceResponse(result, entries[index][0], index)
                  )
                : succeses.push(
                    new ServiceResponse(result, entries[index][0], index)
                  )
            );
            console.log('r_promises: ', result_promises);
            return errores.length > 0 ? null : result_promises[0];
          } 
            return null;
          
        } catch (error) {
          return null;
        }
      }
}