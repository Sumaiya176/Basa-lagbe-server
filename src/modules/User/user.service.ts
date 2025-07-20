import AppError from "../../Error/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);

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
  createUser,
  updateProfile,
};
