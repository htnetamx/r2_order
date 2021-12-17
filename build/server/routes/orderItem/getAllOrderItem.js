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
exports.getAllOrderItemRoute = void 0;
const orderItem_controller_1 = require("../../../controller/orderItem/orderItem.controller");
class getAllOrderItemRoute {
    constructor(server) {
        this.getAllOrderItem = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new orderItem_controller_1.OrdenItemController().getAllOrderItem();
                res.status(200).send(result);
                // eslint-disable-next-line no-empty
            }
            catch (e) { }
        });
        this.server = server;
    }
    configureEndPoints(baseUrl) {
        this.server.get(`${baseUrl}order-item/`, this.getAllOrderItem);
    }
}
exports.getAllOrderItemRoute = getAllOrderItemRoute;
