import { model, Schema } from "mongoose";
import { IContactMessage } from "./ContactMessage.interface";

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactMessage = model<IContactMessage>(
  "ContactMessage",
  contactMessageSchema
);
