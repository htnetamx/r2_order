import { ExpressServer } from './server/express.server';

export default class App {
  private express_Server: ExpressServer;
  
  private port: string | number;

  constructor(port: number) {
    this.express_Server = new ExpressServer();
    this.port = port;
  }

  public async start(): Promise<string> {
    try {
      this.express_Server.listen(this.port);
      return `Server Listening On Port ${  this.port }`;
    } catch (error) {
      return `Could Not Start Server on port  + ${ this.port }`;
    }
  }
}
