"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConnections = void 0;
const dotenv = __importStar(require("dotenv"));
const connection_1 = require("./application/base/types/connection");
const app_1 = __importDefault(require("./app"));
const connections_1 = require("./connections");
dotenv.config();
const setMySQL2 = {
    input: {
        username: process.env.DATABASE_MYSQL_USER || 'root',
        password: process.env.DATABASE_MYSQL_PASSWORD || 'Temp@1324',
        host: process.env.DATABASE_MYSQL_HOST || 'localhost',
        port: process.env.DATABASE_MYSQL_PORT || 3306,
        database: process.env.DATABASE_MYSQL_NAME || 'netamx',
    },
    options: {
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
    },
};
exports.AppConnections = new connections_1.DataBaseConnections();
function appStart() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = process.env.PORT || 3011;
        const app = new app_1.default(+port);
        const AppConnections = new connections_1.DataBaseConnections();
        AppConnections.addConnection(connection_1.ConnectionType.MySQL2, setMySQL2.input, setMySQL2.options);
        var connectionSummary = yield AppConnections.connectDataBases();
        console.log('Summary');
        console.log(connectionSummary.toString().replace(',', '\n') + '\n\n');
        var succeses = connectionSummary.filter((c) => c.status === connection_1.ConnectionStatus.Up);
        if (succeses.length > 0 /*&& succeses.length==connectionSummary.length*/) {
            console.log('Starting App\n\n');
            return yield app.start();
        }
        else {
            console.log('The application could not start');
            connectionSummary = yield AppConnections.disconnectDataBases();
            console.log('Finished disconnecting\n\n');
            return (connectionSummary
                .filter((c) => c.status !== connection_1.ConnectionStatus.Up)
                .toString()
                .replace(',', '\n') + '\n\n');
        }
    });
}
appStart().then((val) => console.log(val));
