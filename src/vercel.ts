import app from "./app";
import serverless from "serverless-http";
import { connectDB } from "./db";

let handler: any;

// Connect DB only once globally
export default async function (req: any, res: any) {
  await connectDB();

  if (!handler) {
    handler = serverless(app);
  }

  return handler(req, res);
}
