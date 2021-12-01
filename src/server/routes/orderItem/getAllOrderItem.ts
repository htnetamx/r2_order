import { Express, Request, Response, NextFunction } from 'express';
import { OrdenItemController } from '../../../controller/orderItem/orderItem.controller';

export class getAllOrderItemRoute {
    private server: Express;
  
    constructor(server: Express) {
      this.server = server;
    }
  
    public getAllOrderItem = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await new OrdenItemController().getAllOrderItem();
        res.status(200).send(result);
      // eslint-disable-next-line no-empty
      } catch (e) {}
    };
  
    public configureEndPoints(baseUrl: string) {
      this.server.get(`${baseUrl}order-item/`, this.getAllOrderItem);
    }
  }