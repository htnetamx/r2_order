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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseConnections = void 0;
const mySQL2_1 = require("./mySQL2");
class DataBaseConnections {
    constructor() {
        this.connections = [];
    }
    addConnection(type, input, options) {
        this.connections.push(new mySQL2_1.MySQL2Connection(input, options));
    }
    connectDataBases() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            let connect_results = [];
            // Set Promises Parallel
            this.connections.forEach((connection) => __awaiter(this, void 0, void 0, function* () {
                promises.push(connection.connect());
            }));
            connect_results = yield Promise.all(promises);
            return this.connections;
        });
    }
    disconnectDataBases() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            let connect_results = [];
            // Set Promises Parallel
            this.connections.forEach((connection) => __awaiter(this, void 0, void 0, function* () {
                promises.push(connection.disconnect());
            }));
            connect_results = yield Promise.all(promises);
            return this.connections;
        });
    }
}
exports.DataBaseConnections = DataBaseConnections;
