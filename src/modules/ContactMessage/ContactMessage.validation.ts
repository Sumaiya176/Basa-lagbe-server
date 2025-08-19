import { z } from "zod";

const createContactMessageValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    }),
    email: z.string({
      invalid_type_error: "Email must be string",
      required_error: "Email is required",
    }),
    phone: z
      .string({
        invalid_type_error: "Phone must be string",
      })
      .max(20, { message: "Phone can not be more than 12 characters" }),
    message: z.string({
      invalid_type_error: "Message must be string",
      required_error: "Message is required",
    }),
  }),
});

export const contactMessageValidation = {
  createContactMessageValidationSchema,
};
