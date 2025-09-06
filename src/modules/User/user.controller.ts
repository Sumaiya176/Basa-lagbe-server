import { RequestHandler } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../util/sendResponse";
import { TDecodedUser } from "./user.interface";

const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllUser();
    console.log("result", result);

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

const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    // const { id } = req.params
    const { id } = req.user as TDecodedUser;
    const result = await userService.getSingleUser(id as string);
    console.log("result", result);

    sendResponse(res, {
      isSuccess: true,
      message: "Retrieved single user successfully",
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
  getSingleUser,
  createUser,
  updateProfile,
};
