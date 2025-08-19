import { RequestHandler } from "express";
import { sendResponse } from "../../util/sendResponse";
import { contactMessageService } from "./ContactMessage.service";

const createContactMessage: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await contactMessageService.createContactMessage(req.body);

    sendResponse(res, {
      isSuccess: true,
      message: "Message sent successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const contactMessageController = {
  createContactMessage,
};
