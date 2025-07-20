import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { TToLetListings } from "./ToLetListings.interface";
import { ToLetListing } from "./ToLetListings.model";

const createToLetListings = async (payload: TToLetListings) => {
  if (new Date(payload?.availability) < new Date()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Availability cannot be less than current date"
    );
  }
  return await ToLetListing.create(payload);
};

const getAllToLetListings = async () => {
  return await ToLetListing.find();
};

const getSingleToLetListings = async (id: string) => {
  const isUserExist = await ToLetListing.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing is not found");
  }

  return isUserExist;
};

const updateToLetListings = async (
  id: string,
  payload: Partial<TToLetListings>
) => {
  console.log(id, payload);
  const isUserExist = await ToLetListing.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing is not found");
  }

  const result = await ToLetListing.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteToLetListings = async (id: string) => {
  const isUserExist = await ToLetListing.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing is not found");
  }

  const result = await ToLetListing.findByIdAndDelete(id);

  return result;
};

export const ToLetListingsService = {
  createToLetListings,
  getAllToLetListings,
  getSingleToLetListings,
  updateToLetListings,
  deleteToLetListings,
};
