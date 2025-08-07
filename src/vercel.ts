import type { IncomingMessage, ServerResponse } from "http";
import app from "./app";
import serverless from "serverless-http";
import { connectDB } from "./db";

let handler: ReturnType<typeof serverless> | null = null;

export default async function handlerWrapper(
  req: IncomingMessage,
  res: ServerResponse
) {
  await connectDB();

  if (!handler) {
    handler = serverless(app);
  }

  return handler(req, res);
}
