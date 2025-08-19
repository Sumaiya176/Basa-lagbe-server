"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
// src/config/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "To-Let API",
            version: "1.0.0",
            description: "API documentation for Bangladeshi Flat Rental Website",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./src/modules/**/*.ts"], // Path to your route files with Swagger comments
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
