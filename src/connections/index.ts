import { MySQL2Connection } from './mySQL2';
import { Connection } from './connection';
import {
  MySQL2ConnectionInputParams,
  MySQL2ConnectionOptions,
  ConnectionType,
} from '../application/base/types';


export class DataBaseConnections {
    public connections: Array<Connection>;
  
    constructor() {
      this.connections = [];
    }
  
    public addConnection(
      type: ConnectionType,
      input:  MySQL2ConnectionInputParams,
      options: MySQL2ConnectionOptions
    ): void {
        this.connections.push(
            new MySQL2Connection(
              <MySQL2ConnectionInputParams>input,
              <MySQL2ConnectionOptions>options
            )
          );
    }
  
    public async connectDataBases(): Promise<Array<Connection>> {
      const promises: Array<Promise<boolean>> = [];
      let connect_results: Array<boolean> = [];
  
      // Set Promises Parallel
      this.connections.forEach(async (connection) => {
        promises.push(connection.connect());
      });
      connect_results = await Promise.all(promises);
  
      /*
          //Syncro Connection
          //Define Connection Order
          var indexes=[];
          indexes.push(this.connections.map(c=>c.type).indexOf(ConnectionType.MySQL2));
          indexes.push(this.connections.map(c=>c.type).indexOf(ConnectionType.Mongoose));
          
          connect_results.push(await this.connections[indexes[0]].connect());
          connect_results.push(await this.connections[indexes[1]].connect());
          */
  
      return this.connections;
    }
  
    public async disconnectDataBases(): Promise<Array<Connection>> {
      const promises: Array<Promise<boolean>> = [];
      let connect_results: Array<boolean> = [];
  
      // Set Promises Parallel
      this.connections.forEach(async (connection) => {
        promises.push(connection.disconnect());
      });
      connect_results = await Promise.all(promises);
      /*
          //Syncro Disconnection
          //Define Disconnection Order
          var indexes=[];
          indexes.push(this.connections.map(c=>c.type).indexOf(ConnectionType.MySQL2));
          indexes.push(this.connections.map(c=>c.type).indexOf(ConnectionType.Mongoose));
  
          connect_results.push(await this.connections[indexes[0]].disconnect());
          connect_results.push(await this.connections[indexes[1]].disconnect());
          
          */
  
      return this.connections;
    }
  }