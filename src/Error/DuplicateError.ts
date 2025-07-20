import { TErrorSource } from "./ErrorInterface";

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSource: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Mongoose Validation Error",
    errorSource,
  };
};

export default handleDuplicateError;
