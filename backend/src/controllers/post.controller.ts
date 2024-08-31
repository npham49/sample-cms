import { Request, Response } from "express";
import * as postService from "../services/post.service";

export const getPostsController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};

export const getLatestPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await postService.getLatestPost(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};

export const publishPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const post = await postService.publishPost(id, content || "");
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error publishing post:", error);
    return res.status(500).json({ error: (error as any).message });
  }
};

export const getPostBySlugController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await postService.getPostBySlug(slug);
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error getting post by slug:", error);
    return res.status(500).json({ error: (error as any).message });
  }
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
  try {
    const { id } = req.params;
    const { content } = req.body;
    const category = await postService.updatePost(id, content);
    return res.status(200).json(category);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: (error as any).message });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};
