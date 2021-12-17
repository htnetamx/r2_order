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
const express_server_1 = require("./server/express.server");
class App {
    constructor(port) {
        this.express_Server = new express_server_1.ExpressServer();
        this.port = port;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.express_Server.listen(this.port);
                return `Server Listening On Port ${this.port}`;
            }
            catch (error) {
                return `Could Not Start Server on port  + ${this.port}`;
            }
        });
    }
}
exports.default = App;
