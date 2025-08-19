"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLetListingValidation = void 0;
const zod_1 = require("zod");
const createToLetListingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        propertyType: zod_1.z
            .string({
            required_error: "Property type is required",
        })
            .min(1, "Property type cannot be empty"),
        bedroom: zod_1.z
            .number({
            required_error: "Number of bedrooms is required",
        })
            .int("Bedroom must be an integer")
            .nonnegative("Bedroom must be non-negative"),
        bathroom: zod_1.z
            .number({
            required_error: "Number of bathrooms is required",
        })
            .int("Bathroom must be an integer")
            .nonnegative("Bathroom must be non-negative"),
        balcony: zod_1.z
            .number({
            required_error: "Number of balconies is required",
        })
            .int("Balcony must be an integer")
            .nonnegative("Balcony must be non-negative"),
        size: zod_1.z
            .number()
            .int("Size must be an integer")
            .nonnegative("Size must be non-negative")
            .optional(),
        availability: zod_1.z
            .string({
            required_error: "Availability is required",
        })
            .min(1, "Availability cannot be empty"),
        description: zod_1.z.string().optional(),
        street: zod_1.z.string().optional(),
        city: zod_1.z
            .string({
            required_error: "City is required",
        })
            .min(1, "City cannot be empty"),
        district: zod_1.z
            .string({
            required_error: "District is required",
        })
            .min(1, "District cannot be empty"),
        area: zod_1.z
            .string({
            required_error: "Area is required",
        })
            .min(1, "Area cannot be empty"),
        rent: zod_1.z
            .number({
            required_error: "Rent amount is required",
        })
            .nonnegative("Rent must be non-negative"),
        advance: zod_1.z
            .number({
            required_error: "Advance amount is required",
        })
            .nonnegative("Advance must be non-negative"),
        noticePeriod: zod_1.z
            .number({
            required_error: "Notice period is required",
        })
            .nonnegative("Notice period must be non-negative"),
        electricity: zod_1.z.boolean().nullable(),
        gas: zod_1.z.boolean().nullable(),
        water: zod_1.z.boolean().nullable(),
        rentNegotiable: zod_1.z.boolean().nullable().optional(),
        internet: zod_1.z.boolean().nullable(),
        security: zod_1.z.boolean().nullable(),
        swimmingPool: zod_1.z.boolean().nullable(),
        furnished: zod_1.z.boolean().nullable(),
        parking: zod_1.z.boolean().nullable(),
        intercom: zod_1.z.boolean().nullable(),
        childrenPlayArea: zod_1.z.boolean().nullable(),
        lift: zod_1.z.boolean().nullable(),
        servantQuarter: zod_1.z.boolean().nullable(),
        waterHeater: zod_1.z.boolean().nullable(),
        generator: zod_1.z.boolean().nullable(),
        fitnessCenter: zod_1.z.boolean().nullable(),
        ac: zod_1.z.boolean().nullable(),
        ownerName: zod_1.z
            .string({
            required_error: "Owner name is required",
        })
            .min(1, "Owner name cannot be empty"),
        ownerEmail: zod_1.z
            .string({
            required_error: "Owner email is required",
        })
            .email("Invalid email format"),
        phone: zod_1.z
            .string({
            required_error: "Phone number is required",
        })
            .min(10, "Phone number must be at least 10 digits"),
        preferredContact: zod_1.z.enum(["phoneCall", "email", "whatsapp"], {
            required_error: "Preferred contact method is required",
            invalid_type_error: "Preferred contact must be either phoneCall, email, or whatsapp",
        }),
        propertyImages: zod_1.z.array(zod_1.z.string()),
    }),
});
// const updateUserProfileValidationSchema = z.object({
//   body: z.object({
//     name: z
//       .string({
//         invalid_type_error: "Name must be string",
//         required_error: "Name is required",
//       })
//       .optional(),
//     email: z
//       .string({
//         invalid_type_error: "Email must be string",
//         required_error: "Email is required",
//       })
//       .optional(),
//   }),
// });
exports.toLetListingValidation = {
    createToLetListingValidationSchema,
};
