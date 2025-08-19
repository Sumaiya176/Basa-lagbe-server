"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string({
            invalid_type_error: "Name must be string",
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required",
        }),
        password: zod_1.z
            .string({
            invalid_type_error: "Password must be string",
            required_error: "Password is required",
        })
            .max(20, { message: "Password can not be more than 20 character" }),
        provider: zod_1.z.string({
            invalid_type_error: "Provider must be string",
            required_error: "Provider is required",
        }),
    }),
});
const updateUserProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Name must be string",
            required_error: "Name is required",
        })
            .optional(),
        email: zod_1.z
            .string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required",
        })
            .optional(),
    }),
});
exports.userValidation = {
    createUserValidationSchema,
    updateUserProfileValidationSchema,
};
