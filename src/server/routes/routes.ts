/* eslint-disable new-cap */
import { Express } from 'express';
import { getByIdRoute } from './order/getById';
import { getAllRoute } from './order/getAll';
import { IndexRoute } from './index/welcome';

export class Routes {
  private server: Express;

  private baseUrl: string = '/api/v1/';

  private indexRoute: IndexRoute;

  private getByIdRoute: getByIdRoute;

  private getAllRoute: getAllRoute;

  constructor(server: Express) {
    this.server = server;
    this.getByIdRoute = new getByIdRoute(server);
    this.getAllRoute = new getAllRoute(server);
    this.indexRoute = new IndexRoute(server);
    this.configureApiEndPoints(this.baseUrl);
  }

  public configureApiEndPoints(baseUrl: string) {
    this.indexRoute.configureEndPoints(baseUrl);
    this.getByIdRoute.configureEndPoints(baseUrl);
    this.getAllRoute.configureEndPoints(baseUrl);
  }
}
