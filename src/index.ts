import * as dotenv from 'dotenv';
import {
    ConnectionType,
    ConnectionStatus,
  } from './application/base/types/connection';
  import App from './app';
  import { DataBaseConnections } from './connections';
  

  
  dotenv.config()
  
  const setMySQL2 = {
    input: {
      username: process.env.DATABASE_MYSQL_USER || 'root',
      password: process.env.DATABASE_MYSQL_PASSWORD || 'Temp@1324',
      host: process.env.DATABASE_MYSQL_HOST || 'localhost',
      port: process.env.DATABASE_MYSQL_PORT || 3306,
      database: process.env.DATABASE_MYSQL_NAME || 'netamx',
    },
    options: {
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
    },
  };
  
  export const AppConnections = new DataBaseConnections();
  
  async function appStart(): Promise<string> {
    const port = process.env.PORT || 3000;
    const app = new App(+port);
    const AppConnections = new DataBaseConnections();

    AppConnections.addConnection(
      ConnectionType.MySQL2,
      setMySQL2.input,
      setMySQL2.options
    );
  
    var connectionSummary = await AppConnections.connectDataBases();
  
    console.log('Summary');
    console.log(connectionSummary.toString().replace(',', '\n') + '\n\n');
  
    var succeses = connectionSummary.filter(
      (c) => c.status === ConnectionStatus.Up
    );
    if (succeses.length > 0 /*&& succeses.length==connectionSummary.length*/) {
      console.log('Starting App\n\n');
      return await app.start();
    } else {
      console.log('The application could not start');
      connectionSummary = await AppConnections.disconnectDataBases();
      console.log('Finished disconnecting\n\n');
      return (
        connectionSummary
          .filter((c) => c.status !== ConnectionStatus.Up)
          .toString()
          .replace(',', '\n') + '\n\n'
      );
    }
  }
  appStart().then((val) => console.log(val));
  