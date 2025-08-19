import { Router } from "express";
import schemaValidation from "../../middlewares/schemaValidation";
import { contactMessageValidation } from "./ContactMessage.validation";
import { contactMessageController } from "./ContactMessage.controller";

const router = Router();

router.post(
  "/",
  schemaValidation(
    contactMessageValidation.createContactMessageValidationSchema
  ),
  contactMessageController.createContactMessage
);

export const ContactMessageRouter = router;
