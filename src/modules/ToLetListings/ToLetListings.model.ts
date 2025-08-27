import { Schema, model, Document } from "mongoose";
import { TToLetListings } from "./ToLetListings.interface";

const toLetListingSchema = new Schema<TToLetListings>(
  {
    propertyType: {
      type: String,
      enum: ["family", "sublet", "office"],
      required: true,
    },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    balcony: { type: Number, required: true },
    size: { type: Number },
    availability: { type: String, required: true },
    floor: { type: Number, required: true },
    description: { type: String },
    address: { type: String },
    thana: { type: String, required: true },
    district: { type: String, required: true },
    division: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    rent: { type: Number, required: true },
    advance: { type: Number, required: true },
    noticePeriod: { type: Number, required: true },

    electricity: { type: Boolean, default: null },
    gas: { type: Boolean, default: null },
    water: { type: Boolean, default: null },
    rentNegotiable: { type: Boolean, default: null },
    internet: { type: Boolean, default: null },
    security: { type: Boolean, default: null },
    swimmingPool: { type: Boolean, default: null },
    furnished: { type: Boolean, default: null },
    parking: { type: Boolean, default: null },
    intercom: { type: Boolean, default: null },
    childrenPlayArea: { type: Boolean, default: null },
    lift: { type: Boolean, default: null },
    servantQuarter: { type: Boolean, default: null },
    waterHeater: { type: Boolean, default: null },
    generator: { type: Boolean, default: null },
    fitnessCenter: { type: Boolean, default: null },
    ac: { type: Boolean, default: null },

    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true },
    preferredContact: {
      type: String,
      enum: ["phoneCall", "email", "whatsapp"],
      required: true,
    },
    propertyImages: {
      type: [String],
      default: [],
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const ToLetListing = model<TToLetListings>(
  "ToLetListing",
  toLetListingSchema
);
