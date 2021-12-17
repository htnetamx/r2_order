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
exports.OrderItemService = void 0;
const index_1 = require("../../../data/db/mySQL/index");
const base_1 = require("../../base");
class OrderItemService {
    constructor() {
        this.repos = {
            mySQL: new index_1.OrderItemRepositoryMySQL(),
        };
    }
    getAllOrderItem() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promises = [];
                const entries = Object.entries(this.repos);
                entries.forEach((entry) => promises.push(entry[1].getAllOrderItem()));
                let result_promises = yield Promise.all(promises);
                if (result_promises.length > 0) {
                    result_promises = result_promises.filter((i) => i !== null);
                    const succeses = [];
                    const errores = [];
                    result_promises.forEach((result, index) => result == null
                        ? errores.push(new base_1.ServiceResponse(result, entries[index][0], index))
                        : succeses.push(new base_1.ServiceResponse(result, entries[index][0], index)));
                    return errores.length > 0 ? null : result_promises[0];
                }
                return null;
            }
            catch (error) {
                return null;
            }
        });
    }
    getByIdOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promises = [];
                const entries = Object.entries(this.repos);
                entries.forEach((entry) => promises.push(entry[1].getByIdOrderItem(id)));
                let result_promises = yield Promise.all(promises);
                if (result_promises.length > 0) {
                    result_promises = result_promises.filter((i) => i !== null);
                    const succeses = [];
                    const errores = [];
                    result_promises.forEach((result, index) => result == null
                        ? errores.push(new base_1.ServiceResponse(result, entries[index][0], index))
                        : succeses.push(new base_1.ServiceResponse(result, entries[index][0], index)));
                    console.log('r_promises: ', result_promises);
                    return errores.length > 0 ? null : result_promises[0];
                }
                return null;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.OrderItemService = OrderItemService;
