import AppError from "../../Error/AppError";
import { IContactMessage } from "./ContactMessage.interface";
import { ContactMessage } from "./ContactMessage.model";

import httpStatus from "http-status";

const createContactMessage = async (payload: IContactMessage) => {
  const result = await ContactMessage.create(payload);

  if (!result) {
    throw new Error("Failed to sent message");
  }

  return result;
};

export const contactMessageService = {
  createContactMessage,
};
