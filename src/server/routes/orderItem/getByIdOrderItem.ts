import { Express, Request, Response, NextFunction } from 'express';
import { OrdenItemController } from '../../../controller/orderItem/orderItem.controller';

export class getByIdOrderItemRoute {
    private server: Express;
  
    constructor(server: Express) {
      this.server = server;
    }
  
    public getByIdOrderItem = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await new OrdenItemController().getByIdOrderItem(req.params.id);
        console.log('Result');
        console.log(result);
        res.status(200).send(result);
      // eslint-disable-next-line no-empty
      } catch (e) {}
    };
  
    public configureEndPoints(baseUrl: string) {
      this.server.get(`${baseUrl}order-item/:id`, this.getByIdOrderItem);
    }
  }