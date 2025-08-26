import { RequestHandler } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../util/sendResponse";

const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllUser();

    sendResponse(res, {
      isSuccess: true,
      message: "Retrieved all users successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const createUser: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await userService.createUser(req.body);

    sendResponse(res, {
      isSuccess: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(req.params.id, req.body);

    console.log(result);

    sendResponse(res, {
      isSuccess: true,
      message: "User's profile updated successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const userController = {
  getAllUser,
  createUser,
  updateProfile,
};
