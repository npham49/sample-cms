import * as express from "express";
import * as categoryController from "../controllers/category.controller";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategoriesController);
categoryRouter.post("/", categoryController.createCategoryController);
categoryRouter.put("/:id", categoryController.updateCategoryController);
categoryRouter.delete("/:id", categoryController.deleteCategoryController);

export default categoryRouter;
