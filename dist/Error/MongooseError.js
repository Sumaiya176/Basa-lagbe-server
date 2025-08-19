"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (err) => {
    const errorSource = Object.values(err === null || err === void 0 ? void 0 : err.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Mongoose Validation Error",
        errorSource,
    };
};
exports.default = handleMongooseError;
