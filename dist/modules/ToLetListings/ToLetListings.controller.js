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
exports.ToLetListingsController = void 0;
const sendResponse_1 = require("../../util/sendResponse");
const ToLetListings_service_1 = require("./ToLetListings.service");
const createToLetListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ToLetListings_service_1.ToLetListingsService.createToLetListings(req.files, req.body, req.user);
        if (!result) {
            throw new Error("Listings not created");
        }
        console.log("from listings controller", result);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "To-let Listings just created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const getAllToLetListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ToLetListings_service_1.ToLetListingsService.getAllToLetListings();
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Retrieved all To-let Listings successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const getSingleToLetListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ToLetListings_service_1.ToLetListingsService.getSingleToLetListings(req.params.id);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Retrieved single To-let Listings successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const updateToLetListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ToLetListings_service_1.ToLetListingsService.updateToLetListings(req.params.id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Updated To-let Listings successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const deleteToLetListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const result = yield ToLetListings_service_1.ToLetListingsService.deleteToLetListings(req.params.id, id);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Deleted To-let Listings successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const myLetListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ToLetListings_service_1.ToLetListingsService.myLetListings(req.user);
        (0, sendResponse_1.sendResponse)(res, {
            isSuccess: true,
            message: "Get my Listings successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.ToLetListingsController = {
    createToLetListings,
    getAllToLetListings,
    getSingleToLetListings,
    updateToLetListings,
    deleteToLetListings,
    myLetListings,
};
