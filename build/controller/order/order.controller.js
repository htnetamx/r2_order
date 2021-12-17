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
exports.OrderController = void 0;
const getById_1 = require("../../application/services/useCases/order/getById");
const getAll_1 = require("../../application/services/useCases/order/getAll");
const post_1 = require("../../application/services/useCases/order/post");
class OrderController {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new getAll_1.getAllUseCase();
            const data = useCase.execute(null);
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new getById_1.getByIdUseCase();
            const data = useCase.execute(id);
            console.log(data);
            return data;
        });
    }
    post(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new post_1.postUseCase();
            const data = useCase.execute(params);
            console.log(data);
            return data;
        });
    }
}
exports.OrderController = OrderController;
