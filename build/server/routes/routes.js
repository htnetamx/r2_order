"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const getById_1 = require("./order/getById");
const getAll_1 = require("./order/getAll");
const welcome_1 = require("./index/welcome");
const post_1 = require("./order/post");
const getAllOrderItem_1 = require("./orderItem/getAllOrderItem");
const getByIdOrderItem_1 = require("./orderItem/getByIdOrderItem");
class Routes {
    constructor(server) {
        this.baseUrl = '/api/v1/';
        this.server = server;
        this.getByIdRoute = new getById_1.getByIdRoute(server);
        this.getAllRoute = new getAll_1.getAllRoute(server);
        this.postRoute = new post_1.postRoute(server);
        this.getByIdOrderItemRoute = new getByIdOrderItem_1.getByIdOrderItemRoute(server);
        this.getAllOrderItemRoute = new getAllOrderItem_1.getAllOrderItemRoute(server);
        this.indexRoute = new welcome_1.IndexRoute(server);
        this.configureApiEndPoints(this.baseUrl);
    }
    configureApiEndPoints(baseUrl) {
        this.indexRoute.configureEndPoints(baseUrl);
        this.getByIdRoute.configureEndPoints(baseUrl);
        this.getAllRoute.configureEndPoints(baseUrl);
        this.postRoute.configureEndPoints(baseUrl);
        this.getByIdOrderItemRoute.configureEndPoints(baseUrl);
        this.getAllOrderItemRoute.configureEndPoints(baseUrl);
    }
}
exports.Routes = Routes;
