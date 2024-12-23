import express, { Application } from "express";
import morgan from "morgan";
import routes from "./routes";
import errorMiddleware from "./middleware/error.middleware";
import { languageMiddleware } from "./middleware/language.middleware";

const app: Application = express();

app.use(morgan("dev"));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);

app.use(express.json());
app.use(languageMiddleware);
app.use("/api", routes);
app.use(errorMiddleware);

export default app;
