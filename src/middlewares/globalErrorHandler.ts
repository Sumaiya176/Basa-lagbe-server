import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../Error/ErrorInterface";
import handleZodError from "../Error/ZodError";
import config from "../config";
import handleMongooseError from "../Error/MongooseError";
import handleCastError from "../Error/CastError";
import handleDuplicateError from "../Error/DuplicateError";
import AppError from "../Error/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = err.message || "Something went wrong";

  let errSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errSource = simplifiedError.errorSource;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleMongooseError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errSource = simplifiedError.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errSource = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errSource = simplifiedError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    isSuccess: false,
    message,
    errSource,
    // amarerror: err,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
