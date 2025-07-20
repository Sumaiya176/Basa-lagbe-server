import app from "./app";
import serverless from "serverless-http";

// Vercel will use this
module.exports = serverless(app);
