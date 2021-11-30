import { Express } from 'express';
// import { getByIdRoute } from "./category/getById";
// import { getAllRoute } from "./category/getAll";
import { IndexRoute } from './index/welcome';

export class Routes {
  private server: Express;
  
  private baseUrl = '/api/v1/';

  private indexRoute: IndexRoute;
  // private getByIdRoute: getByIdRoute;
  // private getAllRoute: getAllRoute;

  constructor(server: Express) {
    this.server = server;
    // this.getByIdRoute = new getByIdRoute(server);
    // this.getAllRoute = new getAllRoute(server);
    this.indexRoute = new IndexRoute(server);
    this.configureApiEndPoints(this.baseUrl);
  }

  public configureApiEndPoints(baseUrl: string) {
    this.indexRoute.configureEndPoints(baseUrl);
    // this.getByIdRoute.configureEndPoints(baseUrl);
    // this.getAllRoute.configureEndPoints(baseUrl);
  }
}
