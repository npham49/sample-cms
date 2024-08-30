import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

import postRouter from "./routes/post.route";
import { protectMiddleware } from "./config/jwt";
import categoryRouter from "./routes/category.route";
import viewRouter from "./routes/view.route";
import path from "path";

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

app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(
    "[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"
  )
);
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use(cors(corsOptions));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/api/posts", protectMiddleware, postRouter);
app.use("/api/categories", protectMiddleware, categoryRouter);
app.use("/content", viewRouter);

const port = process.env.PORT || "8080";
app.listen(port, () => {
  console.log(`server started at :${port}`);
});
