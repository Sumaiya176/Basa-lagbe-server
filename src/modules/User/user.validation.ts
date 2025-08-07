import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    userName: z.string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    }),
    email: z.string({
      invalid_type_error: "Email must be string",
      required_error: "Email is required",
    }),
    password: z
      .string({
        invalid_type_error: "Password must be string",
        required_error: "Password is required",
      })
      .max(20, { message: "Password can not be more than 20 character" }),
    provider: z.string({
      invalid_type_error: "Provider must be string",
      required_error: "Provider is required",
    }),
  }),
});

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be string",
        required_error: "Name is required",
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: "Email must be string",
        required_error: "Email is required",
      })
      .optional(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserProfileValidationSchema,
};
