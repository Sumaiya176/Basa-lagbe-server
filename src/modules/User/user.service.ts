import AppError from "../../Error/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const getAllUser = async () => {
  const result = await User.find();
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No user found");
  }

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findOne({ _id: id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No user found");
  }

  return result;
};

const createUser = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload?.email });
  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, "User is already exists");
  }
  const result = await User.create(payload);

  if (!result) {
    throw new Error("Failed to register new user");
  }

  return result;
};

const updateProfile = async (userId: string, payload: Partial<IUser>) => {
  console.log(userId);
  const isUserFound = await User.findOne({ _id: userId });
  if (!isUserFound) {
    throw new AppError(404, "User not found");
  }
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user profile");
  }
  return result;
};

export const userService = {
  getAllUser,
  getSingleUser,
  createUser,
  updateProfile,
};
