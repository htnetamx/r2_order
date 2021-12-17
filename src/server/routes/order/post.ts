import { Express, Request, Response, NextFunction } from 'express';
import { OrderController } from '../../../controller/order/order.controller';
import { IBasket } from '../../../data/entities/basket';

export class postRoute {
    private server: Express;
  
    constructor(server: Express) {
      this.server = server;
    }
  
    public post = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await new OrderController().post(req.body as IBasket);
        console.log('Result');
        console.log(result);
        res.status(200).send(result);
      } catch (e) {}
    };
  
    public configureEndPoints(baseUrl: string) {
      this.server.post(`${baseUrl}order`, this.post);
    }
  }
  