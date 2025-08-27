import { z } from "zod";

const createToLetListingValidationSchema = z.object({
  body: z.object({
    propertyType: z
      .string({
        required_error: "Property type is required",
      })
      .min(1, "Property type cannot be empty"),

    bedroom: z
      .number({
        required_error: "Number of bedrooms is required",
      })
      .int("Bedroom must be an integer")
      .nonnegative("Bedroom must be non-negative"),

    bathroom: z
      .number({
        required_error: "Number of bathrooms is required",
      })
      .int("Bathroom must be an integer")
      .nonnegative("Bathroom must be non-negative"),

    balcony: z
      .number({
        required_error: "Number of balconies is required",
      })
      .int("Balcony must be an integer")
      .nonnegative("Balcony must be non-negative"),

    size: z
      .number()
      .int("Size must be an integer")
      .nonnegative("Size must be non-negative")
      .optional(),

    availability: z
      .string({
        required_error: "Availability is required",
      })
      .min(1, "Availability cannot be empty"),

    floor: z.string({
      required_error: "Floor is required",
    }),
    description: z.string().optional(),

    address: z.string(),

    thana: z
      .string({
        required_error: "Thana is required",
      })
      .min(1, "Thana cannot be empty"),

    district: z
      .string({
        required_error: "District is required",
      })
      .min(1, "District cannot be empty"),
    division: z
      .string({
        required_error: "District is required",
      })
      .min(1, "District cannot be empty"),
    latitude: z.number(),
    longitude: z.number(),

    rent: z
      .number({
        required_error: "Rent amount is required",
      })
      .nonnegative("Rent must be non-negative"),

    advance: z
      .number({
        required_error: "Advance amount is required",
      })
      .nonnegative("Advance must be non-negative"),

    noticePeriod: z
      .number({
        required_error: "Notice period is required",
      })
      .nonnegative("Notice period must be non-negative"),

    electricity: z.boolean().nullable(),
    gas: z.boolean().nullable(),
    water: z.boolean().nullable(),

    rentNegotiable: z.boolean().nullable().optional(),

    internet: z.boolean().nullable(),
    security: z.boolean().nullable(),
    swimmingPool: z.boolean().nullable(),
    furnished: z.boolean().nullable(),
    parking: z.boolean().nullable(),
    intercom: z.boolean().nullable(),
    childrenPlayArea: z.boolean().nullable(),
    lift: z.boolean().nullable(),
    servantQuarter: z.boolean().nullable(),
    waterHeater: z.boolean().nullable(),
    generator: z.boolean().nullable(),
    fitnessCenter: z.boolean().nullable(),
    ac: z.boolean().nullable(),

    ownerName: z
      .string({
        required_error: "Owner name is required",
      })
      .min(1, "Owner name cannot be empty"),

    ownerEmail: z
      .string({
        required_error: "Owner email is required",
      })
      .email("Invalid email format"),

    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .min(10, "Phone number must be at least 10 digits"),

    preferredContact: z.enum(["phoneCall", "email", "whatsapp"], {
      required_error: "Preferred contact method is required",
      invalid_type_error:
        "Preferred contact must be either phoneCall, email, or whatsapp",
    }),
    propertyImages: z.array(z.string()),
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

export const toLetListingValidation = {
  createToLetListingValidationSchema,
};
