import { OrderBaseModel, Order } from '../../../data/entities/order';
import { IOrderRepository } from '../../contracts/order/index';
import { RepositoryMySQL } from '../../../data/db/mySQL/index';
import {
    ServiceResponse,
    IServiceResponse,
} from '../../base';

export interface IOrderService {
    mySQL: IOrderRepository;
}

export class OrderService {
    public repos: IOrderService = {
        mySQL: new RepositoryMySQL(),
    };

    async getAll(): Promise<Array<OrderBaseModel | null> | null> {
        try {
          const promises: Array<Promise<Array<OrderBaseModel | null> | null>> = [];
          const entries = Object.entries(this.repos);
    
          entries.forEach((entry) =>
            promises.push((<IOrderRepository>entry[1]).getAll())
          );
          let result_promises = await Promise.all(promises);
          if (result_promises.length > 0) {
            result_promises = result_promises.filter((i) => i !== null);
    
            const succeses: Array<
              IServiceResponse<Array<OrderBaseModel | null> | null>
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
    
      async getById(id: number): Promise<OrderBaseModel | null> {
        try {
          const promises: Array<Promise<OrderBaseModel | null>> = [];
          const entries = Object.entries(this.repos);
    
          entries.forEach((entry) =>
            promises.push((<IOrderRepository>entry[1]).getById(id))
          );
          let result_promises = await Promise.all(promises);
    
          if (result_promises.length > 0) {
            result_promises = result_promises.filter((i) => i !== null);
            const succeses: Array<IServiceResponse<OrderBaseModel | null>> = [];
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