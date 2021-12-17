"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setfilterParams = void 0;
const ts_transformer_keys_1 = require("ts-transformer-keys");
__exportStar(require("./connection"), exports);
__exportStar(require("./server-status"), exports);
__exportStar(require("./mySQL2"), exports);
const setfilterParams = (data, filtertype) => {
    const filtered = {};
    let count = 0;
    const filter = (filtered, key, value, count) => {
        filtered[key] = value;
        count = count + 1;
        return count;
    };
    var requiredkeys = (0, ts_transformer_keys_1.keys)().map((k) => k.toString());
    Object.entries(data).forEach(([key, value]) => value == null || value == undefined || !requiredkeys.includes(key)
        ? count
        : (count = filter(filtered, key, value, count)));
    return filtered == {} ||
        filtered == undefined ||
        filtered == null ||
        count == 0
        ? null
        : filtered;
};
exports.setfilterParams = setfilterParams;
