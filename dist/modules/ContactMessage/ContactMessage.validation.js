"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactMessageValidation = void 0;
const zod_1 = require("zod");
const createContactMessageValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Name must be string",
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required",
        }),
        phone: zod_1.z
            .string({
            invalid_type_error: "Phone must be string",
        })
            .max(20, { message: "Phone can not be more than 12 characters" }),
        message: zod_1.z.string({
            invalid_type_error: "Message must be string",
            required_error: "Message is required",
        }),
    }),
});
exports.contactMessageValidation = {
    createContactMessageValidationSchema,
};
