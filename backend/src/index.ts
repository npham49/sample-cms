import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

import postRouter from "./routes/post.route";
import { protectMiddleware } from "./config/jwt";
import categoryRouter from "./routes/category.route";

require("dotenv").config();

const corsOptions = {
  origin:
    process.env.ORIGIN_URL ||
    process.env.OPENSHIFT_NODEJS_ORIGIN_URL ||
    "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(
    "[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"
  )
);
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use(cors(corsOptions));
app.use(helmet());

app.use("/api/posts", protectMiddleware, postRouter);
app.use("/api/categories", protectMiddleware, categoryRouter);

const port = process.env.PORT || "8080";
app.listen(port, () => {
  console.log(`server started at :${port}`);
});
