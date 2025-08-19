"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// backend/src/utils/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const generateToken = (secret, payload, expiration) => {
    return jsonwebtoken_1.default.sign({ payload }, secret, { expiresIn: expiration });
};
exports.generateToken = generateToken;
const verifyToken = (secret, token) => {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    return decoded;
};
exports.verifyToken = verifyToken;
