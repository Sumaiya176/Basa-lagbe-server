import { NextFunction, Request, Response } from "express";

import { sendResponse } from "../../util/sendResponse";
import { ToLetListingsService } from "./ToLetListings.service";
import { TDecodedUser } from "../User/user.interface";

const createToLetListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ToLetListingsService.createToLetListings(
      req.files,
      req.body,
      req.user as TDecodedUser
    );

    if (!result) {
      throw new Error("Listings not created");
    }

    console.log("from listings controller", result);

    sendResponse(res, {
      isSuccess: true,
      message: "To-let Listings just created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getAllToLetListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ToLetListingsService.getAllToLetListings();

    sendResponse(res, {
      isSuccess: true,
      message: "Retrieved all To-let Listings successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getSingleToLetListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ToLetListingsService.getSingleToLetListings(
      req.params.id
    );

    sendResponse(res, {
      isSuccess: true,
      message: "Retrieved single To-let Listings successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateToLetListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ToLetListingsService.updateToLetListings(
      req.params.id,
      req.body
    );

    sendResponse(res, {
      isSuccess: true,
      message: "Updated To-let Listings successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteToLetListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as TDecodedUser;
    const result = await ToLetListingsService.deleteToLetListings(
      req.params.id,
      id
    );

    sendResponse(res, {
      isSuccess: true,
      message: "Deleted To-let Listings successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const myLetListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ToLetListingsService.myLetListings(
      req.user as TDecodedUser
    );

    sendResponse(res, {
      isSuccess: true,
      message: "Get my Listings successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const ToLetListingsController = {
  createToLetListings,
  getAllToLetListings,
  getSingleToLetListings,
  updateToLetListings,
  deleteToLetListings,
  myLetListings,
};
