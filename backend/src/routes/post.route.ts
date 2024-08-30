import * as express from "express";
import * as postController from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.get("/", postController.getPostsController);
postRouter.get("/latest/:id", postController.getLatestPostController);
postRouter.post("/publish/:id", postController.publishPostController);
postRouter.post("/", postController.createPostController);
postRouter.put("/:id", postController.updatePostController);
postRouter.delete("/:id", postController.deletePostController);

export default postRouter;
