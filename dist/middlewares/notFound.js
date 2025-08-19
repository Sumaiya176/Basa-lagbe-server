"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    res.send(404).json({
        success: false,
        message: "API Not Found!!",
        error: "",
    });
};
exports.default = notFound;
