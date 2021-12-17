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
exports.OrdenItemController = void 0;
const getAllOrderItem_1 = require("../../application/services/useCases/orderItem/getAllOrderItem");
const getByIdOrderItem_1 = require("../../application/services/useCases/orderItem/getByIdOrderItem");
class OrdenItemController {
    getAllOrderItem() {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line new-cap
            const useCase = new getAllOrderItem_1.getAllOrderItem();
            const data = useCase.execute(null);
            return data;
        });
    }
    getByIdOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line new-cap
            const useCase = new getByIdOrderItem_1.getByIdOrderItem();
            const data = useCase.execute(id);
            console.log(data);
            return data;
        });
    }
}
exports.OrdenItemController = OrdenItemController;
