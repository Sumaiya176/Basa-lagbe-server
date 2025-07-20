import mongoose from "mongoose";

import { TErrorSource } from "./ErrorInterface";

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid Id",
    errorSource,
  };
};

export default handleCastError;
