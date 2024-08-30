import * as viewController from "../controllers/view.controller";
import express from "express";

const viewRouter = express.Router();

viewRouter.get("/view/:slug", viewController.getPostViewController);

viewRouter.get("/preview/:id", viewController.getPreViewPostController);

export default viewRouter;
