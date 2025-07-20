import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
