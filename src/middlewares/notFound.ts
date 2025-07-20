import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.send(404).json({
    success: false,
    message: "API Not Found!!",
    error: "",
  });
};

export default notFound;
