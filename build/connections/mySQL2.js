"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL2Connection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const promises_1 = __importDefault(require("fs/promises"));
const types_1 = require("../application/base/types");
const connection_1 = require("./connection");
class MySQL2Connection extends connection_1.Connection {
    constructor(input, options) {
        super(input, options);
        this.type = types_1.ConnectionType.MySQL2;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let port_parsed;
            let results;
            let fields;
            // eslint-disable-next-line no-unused-expressions
            !this.input.port ? (port_parsed = 3306) : (port_parsed = +this.input.port);
            // eslint-disable-next-line no-unused-expressions
            this.input.port;
            try {
                this.pool = yield promise_1.default.createPool({
                    host: this.input.host,
                    port: port_parsed,
                    user: this.input.username,
                    password: this.input.password,
                    database: this.input.database,
                    connectionLimit: this.options
                        .connectionLimit,
                    waitForConnections: this.options
                        .waitForConnections,
                    queueLimit: this.options.queueLimit,
                    multipleStatements: true,
                });
                [results, fields] = yield this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?', [this.input.database]);
                connection_1.Connection.mySQL2Pool = this.pool;
                this.status = types_1.ConnectionStatus.Up;
                return true;
            }
            catch (error) {
                try {
                    this.pool = yield promise_1.default.createPool({
                        host: this.input.host,
                        port: port_parsed,
                        user: this.input.username,
                        password: this.input.password,
                        connectionLimit: this.options
                            .connectionLimit,
                        waitForConnections: this.options
                            .waitForConnections,
                        queueLimit: this.options.queueLimit,
                    });
                    [results, fields] = yield this.executeQuery('CREATE DATABASE IF NOT EXISTS ??', [this.input.database]);
                    this.pool = yield promise_1.default.createPool({
                        host: this.input.host,
                        port: port_parsed,
                        user: this.input.username,
                        password: this.input.password,
                        database: this.input.database,
                        connectionLimit: this.options
                            .connectionLimit,
                        waitForConnections: this.options
                            .waitForConnections,
                        queueLimit: this.options.queueLimit,
                    });
                    const initialDataBase = yield this.serializeQueries(yield this.readSetSQLFile('src/data/db/mySQL/initialDataBase.sql'));
                    [results, fields] = yield this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?', [this.input.database]);
                    connection_1.Connection.mySQL2Pool = this.pool;
                    this.status = types_1.ConnectionStatus.Up;
                    return true;
                }
                catch (error2) {
                    this.pool = null;
                    connection_1.Connection.mySQL2Pool = null;
                    this.status = types_1.ConnectionStatus.Error;
                    // console.log(error);
                    // console.log(error2);
                    return false;
                }
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.pool != null) {
                    yield this.pool.end();
                    this.pool = null;
                    connection_1.Connection.mySQL2Pool = null;
                    this.status = types_1.ConnectionStatus.Down;
                    return true;
                }
                this.status = types_1.ConnectionStatus.Down;
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
    executeQuery(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool
                // eslint-disable-next-line no-return-await
                ? yield this.pool.execute(promise_1.default.format(query, params))
                : null;
        });
    }
    serializeQueries(dataArr) {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = [];
            if (this.pool) {
                for (let i = 0; i < dataArr.length; i += 1) {
                    try {
                        if (dataArr[i])
                            // eslint-disable-next-line no-await-in-loop
                            queries.push({ Success: yield this.executeQuery(dataArr[i]) });
                    }
                    catch (error) {
                        queries.push({ Error: error.sqlMessage });
                    }
                }
                return queries;
            }
            return queries;
        });
    }
    readSetSQLFile(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataArr = (yield promises_1.default.readFile(uri))
                .toString()
                .toString()
                .replace(/(\r\n|\n|\r|\t)/gm, '')
                .replace(/\s+/g, ' ')
                .trim()
                .split(';');
            return dataArr;
        });
    }
}
exports.MySQL2Connection = MySQL2Connection;
