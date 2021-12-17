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
exports.IndexRoute = void 0;
class IndexRoute {
    constructor(server) {
        this.welcomeMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = "Esta funcionando el mani";
                res.status(200).send(result);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.server = server;
    }
    configureEndPoints(baseUrl) {
        /**
         * @swagger
         * /:
         *  get:
         *    summary: Welcome message
         *    responses:
         *      200:
         *        description: Return a welcome message
         *        content:
         *          text/html:
         *               schema:
         *                  type: string
         *                  example: Esta funcionando el mani
         */
        this.server.get(``, this.welcomeMessage);
        this.server.get(`${baseUrl}`, this.welcomeMessage);
    }
}
exports.IndexRoute = IndexRoute;
