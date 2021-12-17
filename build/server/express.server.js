"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// import * as pkg from '../../package.json';
const swaggerOptions_1 = require("../swaggerOptions");
const routes_1 = require("./routes");
class ExpressServer {
    constructor() {
        this.specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
        this.server = (0, express_1.default)();
        this.setupStandardMiddleware();
        new routes_1.Routes(this.server);
    }
    listen(port) {
        return this.server.listen(port);
    }
    setupStandardMiddleware() {
        // this.server.set('pkg', pkg);
        this.server.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.server.use((0, morgan_1.default)('dev'));
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: false }));
        this.server.use((0, helmet_1.default)());
        this.server.use((0, compression_1.default)());
        this.server.use((0, cors_1.default)());
        this.server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.specs));
    }
}
exports.ExpressServer = ExpressServer;
