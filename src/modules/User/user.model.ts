import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: 0,
      default: null,
    },
    provider: {
      type: String,
      enum: ["google", "github", "facebook", "credentials"],
      required: true,
    },
    passwordUpdatedAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["blocked", "active"],
      default: "active",
    },
    savedProperty: [
      {
        type: Schema.Types.ObjectId,
        ref: "ToLetListing",
      },
    ],
    listingHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "ToLetListing",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser>("User", userSchema);
