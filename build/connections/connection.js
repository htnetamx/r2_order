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
exports.Connection = void 0;
const types_1 = require("../application/base/types");
class Connection {
    constructor(input, options) {
        this.toString = () => {
            let connection = `Connection: ${this.type}`;
            const clength = 22 - connection.length;
            let status = `Status:     ${this.status}`;
            const slength = 22 - status.length;
            if (this.type) {
                for (let i = 0; i < clength; i += 1) {
                    connection += ' ';
                }
            }
            if (this.status) {
                for (let i = 0; i < slength; i += 1) {
                    status += ' ';
                }
            }
            const str = `| ${connection} | ${status} |`;
            return str;
        };
        this.input = input;
        this.options = options;
        this.pool = null;
        this.type = null;
        this.status = types_1.ConnectionStatus.Down;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}
exports.Connection = Connection;
Connection.mySQL2Pool = null;
