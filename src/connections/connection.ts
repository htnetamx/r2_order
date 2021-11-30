import {
  MySQL2ConnectionInputParams,
  MySQL2ConnectionOptions,
  MySQL2ConnectionType,
  ConnectionStatus,
  ConnectionType,
} from '../application/base/types';

export class Connection {
  public static mySQL2Pool: MySQL2ConnectionType | null = null;

  public input: MySQL2ConnectionInputParams;

  public options: MySQL2ConnectionOptions;

  public pool: null | MySQL2ConnectionType;

  public type: null | ConnectionType;

  public status: null | ConnectionStatus;

  constructor(
    input: MySQL2ConnectionInputParams,
    options: MySQL2ConnectionOptions
  ) {
    this.input = input;
    this.options = options;
    this.pool = null;
    this.type = null;
    this.status = ConnectionStatus.Down;
  }

  public async connect(): Promise<boolean> {
    return false;
  }

  public async disconnect(): Promise<boolean> {
    return false;
  }

  public toString = (): string => {
    let connection = `Connection: ${this.type}`;
    const clength = 22 - connection.length;
    let status = `Status:     ${this.status}`;
    const slength = 22 - status.length;
    if (this.type) {
      for (let i = 0; i < clength; i+=1) {
        connection += ' ';
      }
    }
    if (this.status) {
      for (let i = 0; i < slength; i+=1) {
        status += ' ';
      }
    }
    const str = `| ${connection} | ${status} |`;
    return str;
  };
}
