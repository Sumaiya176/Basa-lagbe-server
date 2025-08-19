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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handlerWrapper;
const app_1 = __importDefault(require("./app"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const db_1 = require("./db");
let handler = null;
function handlerWrapper(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
        if (!handler) {
            handler = (0, serverless_http_1.default)(app_1.default);
        }
        return handler(req, res);
    });
}
