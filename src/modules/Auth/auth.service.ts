import AppError from "../../Error/AppError";
import { User } from "../User/user.model";
import { TUser } from "./auth.interface";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import sendEmail from "../../util/sendEmail";

// ~~~~~~~~~~~~~~~~~~~~~~~ Login Service ~~~~~~~~~~~~~~~~~~~~~~~~~~
const login = async (payload: TUser) => {
  console.log(payload);
  const isUserExists = await User.findOne({ email: payload?.email }).select(
    "+password"
  );
  // ---- checking if the user is exist ------
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!!");
  }

  // ----- checking if the user is blocked or not -----
  if (isUserExists.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user is blocked");
  }
  // ----- checking if the password id matched or not -----

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password as string
  );
  if (!isPasswordMatched)
    throw new AppError(httpStatus.FORBIDDEN, "Wrong Password");

  const jwtPayload = {
    id: isUserExists?._id,
    email: isUserExists?.email,
    role: isUserExists?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: "30d",
    }
  );
  //const result = await User.find();
  return { accessToken, refreshToken };
};

// ~~~~~~~~~~~~~~~~~~~~~~~  Refresh Token service ~~~~~~~~~~~~~~~~~~~~~~~
const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { id, iat } = decoded;

  console.log(decoded);

  const user = await User.findById(id);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  if (user?.status === "blocked")
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked.");

  const passwordUpdateTime =
    new Date(user?.passwordUpdatedAt as Date).getTime() / 1000;

  if (user?.passwordUpdatedAt && passwordUpdateTime > (iat as number)) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return { accessToken };
};

// ~~~~~~~~~~~~~~~~~~~~~~~ Change Password ~~~~~~~~~~~~~~~~~~~~~~~
const changePassword = async (
  userInfo: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findOne({ name: userInfo.name }).select("+password");

  // ------ checking if the user is exist ------
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!!");
  }

  // ----- checking if the old password is matched or not -----
  const isPasswordMatched = bcrypt.compare(
    payload?.oldPassword,
    user?.password as string
  );
  if (!isPasswordMatched)
    throw new AppError(httpStatus.FORBIDDEN, "Wrong Old Password");

  // ------ bcrypt the new password -------
  const encryptedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    { name: userInfo.name },
    {
      password: encryptedPassword,
      passwordUpdatedAt: new Date(),
    }
  );

  return result;
};

// ~~~~~~~~~~~~~~~~~~~~~~~ Forget Password ~~~~~~~~~~~~~~~~~~~~~~~
const forgetPassword = async (id: string) => {
  const user = await User.findById(id);
  // ---- checking if the user is exist ------
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!!");
  }

  // ----- checking if the user is blocked or not -----
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user is blocked");
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10m",
  });

  const resetLink = `http://localhost:3000/?id=${user._id}&token=${resetToken}`;

  sendEmail(user?.email, resetLink);
};

// ~~~~~~~~~~~~~~~~~~~~~~~ Reset Password ~~~~~~~~~~~~~~~~~~~~~~~
const resetPassword = async (
  { id, newPassword }: { id: string; newPassword: string },
  token: string
) => {
  const user = await User.findById(id);
  // ---- checking if the user is exist ------
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!!");
  }

  // ----- checking if the user is blocked or not -----
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user is blocked");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (id !== decoded.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden");
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    { _id: id },
    {
      password: newHashedPassword,
      passwordUpdatedAt: new Date(),
    }
  );
};

export const authService = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
