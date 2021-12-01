import { Credential } from '../../../application/domain/credential';
import { OrderMapperMySQL } from './mappers';
import { Connection } from '../../../connections/connection';
import { IOrderRepository } from '../../../application/contracts/order/index';
import { OrderBaseModel } from '../../entities/order';
import { OrderItemMapperMySQL } from './mappers/orderItem';
import { IOrderItemRepository } from '../../../application/contracts/orderItem/index';
import { OrderItemBaseModel } from '../../entities/orderItem';


export class RepositoryMySQL implements IOrderRepository {
  private userMapper: OrderMapperMySQL;

  constructor() {
    this.userMapper = new OrderMapperMySQL();
  }

  async getAll(): Promise<Array<OrderBaseModel | null> | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query(
        'SELECT * from netamx.Order;'
      );
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const result = data.map<OrderBaseModel>((r) => new OrderMapperMySQL().mapFrom(r as any));
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getById(id: any): Promise<OrderBaseModel | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query({
        sql: `SELECT * from netamx.Order where id=${  id  };`,
      });
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const entity = new OrderMapperMySQL().mapFrom(data[0] as any);
      console.log(entity);
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}



export class OrderItemRepositoryMySQL implements IOrderItemRepository {
  private userMapper: OrderItemMapperMySQL;

  constructor() {
    this.userMapper = new OrderItemMapperMySQL();
  }

  async getAllOrderItem(): Promise<Array<OrderItemBaseModel | null> | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query(
        'SELECT * from netamx.OrderItem;'
      );
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const result = data.map<OrderItemBaseModel>((r) => new OrderItemMapperMySQL().mapFrom(r as any));
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByIdOrderItem(id: number): Promise<OrderItemBaseModel | null> {
    try {
      if (Connection.mySQL2Pool == null) return null;
      const [results, fields] = await Connection.mySQL2Pool.query({
        sql: `SELECT * from netamx.OrderItem where id=${  id  };`,
      });
      const data = Object.values(JSON.parse(JSON.stringify(results)));
      const entity = new OrderItemMapperMySQL().mapFrom(data[0] as any);
      console.log(entity);
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
