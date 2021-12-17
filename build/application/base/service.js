"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = exports.GroupedService = void 0;
class GroupedService {
    constructor(promises, succeses, errores) {
        this.promises = promises;
        this.successes = succeses;
        this.errores = errores;
    }
}
exports.GroupedService = GroupedService;
class ServiceResponse {
    constructor(response, dataBase, dataBaseIndex) {
        this.response = response;
        this.dataBase = dataBase;
        this.dataBaseIndex = dataBaseIndex;
    }
}
exports.ServiceResponse = ServiceResponse;
