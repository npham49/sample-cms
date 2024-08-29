import { Request, Response } from "express";

export const getPostsController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};

export const createPostController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};

export const updatePostController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};

export const deletePostController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello, World!");
};
