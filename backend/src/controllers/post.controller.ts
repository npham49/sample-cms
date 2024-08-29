import { Request, Response } from "express";
import * as postService from "../services/post.service";

export const getPostsController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};

export const createPostController = async (req: Request, res: Response) => {
  try {
    const { title, categoryId } = req.body;
    if (!title || !categoryId) {
      return res.status(400).send("Title and content are required");
    }

    if (!res.locals.context) {
      return res.status(401).send("Unauthorized");
    }

    console.log("Context:", res.locals.context);
    const userId = res.locals.context.userid;

    // Create post
    const post = await postService.createPost({ title, categoryId, userId });
    return res.status(201).send("Post created");
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: (error as any).message });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};

export const deletePostController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};
