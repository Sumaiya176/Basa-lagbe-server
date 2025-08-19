"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactMessageController = void 0;
const sendResponse_1 = require("../../util/sendResponse");
const ContactMessage_service_1 = require("./ContactMessage.service");
const createContactMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const result = yield ContactMessage_service_1.contactMessageService.createContactMessage(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Message sent successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.contactMessageController = {
    createContactMessage,
};
