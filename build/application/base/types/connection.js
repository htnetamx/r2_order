"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionStatus = exports.ConnectionType = void 0;
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["MySQL2"] = "MySQL2";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["Up"] = "Up";
    ConnectionStatus["Down"] = "Down";
    ConnectionStatus["Error"] = "Error";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));
