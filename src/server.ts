import app from "./app";
import config from "./config/index";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅✅ Database is connected successfully 👍👍");

    server = app.listen(config.port, () => {
      console.log(
        `🚀🚀~~ Basa Lagbe is listening on port ${config.port} ~~🚀🚀`
      );
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
}

main();

// process.on("unhandledRejection", () => {
//   console.log("Unhandled Rejection is detected. Server is shutting down...");
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// process.on("uncaughtException", () => {
//   console.log("Uncaught Exception is detected. Server is shutting down...");
//   process.exit(1);
// });
