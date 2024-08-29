import { Post } from "@prisma/client";
import { db } from "../config/db";
import { InputJsonValue } from "@prisma/client/runtime/library";

export const createPost = async (post: Post): Promise<Post> => {
  const newPost = await db.post.create({
    data: {
      ...post,
      content: post.content as InputJsonValue, // Explicitly cast the content property to any type
    },
  });
  return newPost;
};

export const getPosts = async (): Promise<Post[]> => {
  const posts = await db.post.findMany();
  return posts;
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};

export const updatePost = async (
  id: string,
  post: Post
): Promise<Post | null> => {
  const updatedPost = await db.post.update({
    where: {
      id,
    },
    data: {
      ...post,
      content: post.content as InputJsonValue, // Explicitly cast the content property to any type
    },
  });
  return updatedPost;
};

export const deletePost = async (id: string): Promise<Post | null> => {
  const deletedPost = await db.post.delete({
    where: {
      id,
    },
  });
  return deletedPost;
};
