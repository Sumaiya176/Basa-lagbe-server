import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { TToLetListings } from "./ToLetListings.interface";
import { ToLetListing } from "./ToLetListings.model";
import { ImageSendToCloudinary } from "../../util/ImageSendToCloudinary";
import mongoose from "mongoose";
import { User } from "../User/user.model";
import { TDecodedUser } from "../User/user.interface";
const { ObjectId } = require("mongodb");

const createToLetListings = async (
  files: any,
  payload: TToLetListings,
  user: TDecodedUser
) => {
  //console.log("payload", payload, files);
  if (files && files.length) {
    const imageUrls: string[] = [];

    for (const file of files) {
      const imageName = `${payload.ownerName}${Date.now()}`;
      const { buffer } = file; // ✅ from memory storage
      const { secure_url } = await ImageSendToCloudinary(imageName, buffer);
      imageUrls.push(secure_url);
    }
    payload.propertyImages = imageUrls;
  }

  if (new Date(payload?.availability) < new Date()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Availability cannot be less than current date"
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newListing = await ToLetListing.create([payload], { session });

    if (!newListing) {
      throw new Error("Failed to add listings");
    }

    const updateUserListingHistory = await User.findByIdAndUpdate(
      user.id,
      { $push: { listingHistory: newListing[0]._id } },
      { new: true, session }
    ).session(session);

    if (!updateUserListingHistory) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    await session.commitTransaction();
    session.endSession();

    return newListing[0];
  } catch (err) {
    console.log("error", err);
    await session.abortTransaction();
    session.endSession();
    throw new Error();
  }
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
  const isListingExist = await ToLetListing.findById(id);
  if (!isListingExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing is not found");
  }

  const result = await ToLetListing.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteToLetListings = async (id: string, userId: string) => {
  const isListingExist = await ToLetListing.findById(id);
  if (!isListingExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing is not found");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deleteFromListing = await ToLetListing.findByIdAndDelete(id, {
      session,
    });

    if (!deleteFromListing) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Listing not found or already deleted"
      );
    }
    const deleteFromUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { listingHistory: id } },
      { new: true, session }
    ).session(session);

    if (!deleteFromUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    await session.commitTransaction();
    session.endSession();

    return { deleteFromListing, deleteFromUser };
  } catch (err) {
    console.log("error", err);
    await session.abortTransaction();
    session.endSession();
    throw new Error();
  }
};

const myLetListings = async (user: TDecodedUser) => {
  const result = await User.findById(user.id).populate("listingHistory");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Listing is not found");
  }

  return result;
};

const createSavedProperty = async (id: string, user: TDecodedUser) => {
  const userListing = await User.findById(user.id).populate({
    path: "savedProperty",
    populate: {
      path: "listingId",
    },
  });

  if (userListing?.savedProperty) {
    for (const listing of userListing?.savedProperty) {
      if (new ObjectId(listing.listingId).toString() === id) {
        throw new AppError(
          httpStatus.CONFLICT,
          "Item is already in saved list!!"
        );
        break;
      }
    }
  }

  const data = {
    listingId: id,
    savedAt: new Date(),
  };

  const result = await User.findByIdAndUpdate(
    user.id,
    { $push: { savedProperty: data } },
    { new: true }
  );

  if (!result) {
    throw new Error("Property failed to save");
  }

  return result;
};

const getSavedProperty = async (user: TDecodedUser) => {
  const result = await User.findById(user.id).populate({
    path: "savedProperty",
    populate: {
      path: "listingId",
    },
  });

  if (!result) {
    throw new Error("Failed to retrieve saved property");
  }

  return result.savedProperty;
};

const removeSavedProperty = async (id: string, user: TDecodedUser) => {
  const result = await User.findByIdAndUpdate(
    user.id,
    { $pull: { savedProperty: id } },
    { new: true }
  );

  if (!result) {
    throw new Error("Property failed to remove");
  }

  return result.savedProperty;
};

const createRecentlyViewed = async (id: string, user: TDecodedUser) => {
  const userListing = await User.findById(user.id);
  if (userListing?.recentlyViewed) {
    for (const listing of userListing?.recentlyViewed) {
      if (new ObjectId(listing.listingId).toString() === id) {
        throw new AppError(
          httpStatus.CONFLICT,
          "Item is already in viewed list!!"
        );
        break;
      }
    }
  }

  const data = {
    listingId: id,
    savedAt: new Date(),
  };

  const result = await User.findByIdAndUpdate(
    user.id,
    { $push: { recentlyViewed: data } },
    { new: true }
  );

  if (!result) {
    throw new Error("Property failed to save");
  }

  return result;
};

const getViewedProperty = async (user: TDecodedUser) => {
  const result = await User.findById(user.id).populate("recentlyViewed");

  if (!result) {
    throw new Error("Failed to retrieve viewed property");
  }

  return result.recentlyViewed;
};

const removeViewedProperty = async (id: string, user: TDecodedUser) => {
  const result = await User.findByIdAndUpdate(
    user.id,
    { $pull: { recentlyViewed: id } },
    { new: true }
  );
  if (!result) {
    throw new Error("Property failed to remove");
  }

  return result.recentlyViewed;
};

export const ToLetListingsService = {
  createToLetListings,
  getAllToLetListings,
  getSingleToLetListings,
  updateToLetListings,
  deleteToLetListings,
  myLetListings,
  createSavedProperty,
  getSavedProperty,
  removeSavedProperty,
  createRecentlyViewed,
  getViewedProperty,
  removeViewedProperty,
};
