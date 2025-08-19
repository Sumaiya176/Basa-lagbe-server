"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessageRouter = void 0;
const express_1 = require("express");
const schemaValidation_1 = __importDefault(require("../../middlewares/schemaValidation"));
const ContactMessage_validation_1 = require("./ContactMessage.validation");
const ContactMessage_controller_1 = require("./ContactMessage.controller");
const router = (0, express_1.Router)();
router.post("/", (0, schemaValidation_1.default)(ContactMessage_validation_1.contactMessageValidation.createContactMessageValidationSchema), ContactMessage_controller_1.contactMessageController.createContactMessage);
exports.ContactMessageRouter = router;
