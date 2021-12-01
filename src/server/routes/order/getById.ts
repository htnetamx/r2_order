import { Express, Request, Response, NextFunction } from 'express';
import { OrderController } from '../../../controller/order/order.controller';

export class getByIdRoute {
    private server: Express;
  
    constructor(server: Express) {
      this.server = server;
    }
  
    public getById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await new OrderController().getById(req.params.id);
        console.log('Result');
        console.log(result);
        res.status(200).send(result);
      } catch (e) {}
    };
  
    public configureEndPoints(baseUrl: string) {
      this.server.get(`${baseUrl}order/:id`, this.getById);
    }
  }
  