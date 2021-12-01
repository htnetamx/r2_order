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
      return this.connections;
    }
  }