"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, responseData) => {
    const { data, message, isSuccess } = responseData;
    res.status(200).json({
        isSuccess,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
