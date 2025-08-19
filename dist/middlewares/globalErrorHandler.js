"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ZodError_1 = __importDefault(require("../Error/ZodError"));
const config_1 = __importDefault(require("../config"));
const MongooseError_1 = __importDefault(require("../Error/MongooseError"));
const CastError_1 = __importDefault(require("../Error/CastError"));
const DuplicateError_1 = __importDefault(require("../Error/DuplicateError"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || "Something went wrong";
    let errSource = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, ZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errSource = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, MongooseError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errSource = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, CastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errSource = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, DuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errSource = simplifiedError.errorSource;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errSource = [
            {
                path: "",
                message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message || "Something went wrong";
        console.log("from geh", err, "jjjjjjj", err.message);
        errSource = [
            {
                path: "",
                message: message,
            },
        ];
    }
    res.status(statusCode).json({
        isSuccess: false,
        message,
        errSource,
        // amarerror: err,
        stack: config_1.default.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
