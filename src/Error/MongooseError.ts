import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "./ErrorInterface";

const handleMongooseError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSource: TErrorSource = Object.values(err?.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "Mongoose Validation Error",
    errorSource,
  };
};

export default handleMongooseError;
