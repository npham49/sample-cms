import { Post } from "@prisma/client";
import { db } from "../config/db";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { camelize } from "../utils/helper";

export const createPost = async ({
  title,
  categoryId,
  userId,
}: {
  title: string;
  categoryId: string;
  userId: string;
}): Promise<Post> => {
  const newPost = await db.post.create({
    data: {
      title,
      categoryId,
      authorId: userId,
      blob: camelize(title),
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

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  // get the highest version of the post and with published set to true
  const post = await db.post.findFirst({
    where: {
      blob: slug,
      published: true,
    },
    orderBy: {
      version: "desc",
    },
  });
  return post;
};

export const getLatestPost = async (id: string): Promise<Post | null> => {
  const post = await db.post.findFirst({
    where: {
      postId: id,
    },
    orderBy: {
      version: "desc",
    },
  });
  return post;
};

export const updatePost = async (
  id: string,
  content: string
): Promise<Post | null> => {
  const updatedPost = await db.post.update({
    where: {
      id,
    },
    data: {
      content: content, // Explicitly cast the content property to any type
    },
  });
  return updatedPost;
};

export const publishPost = async (
  id: string,
  content: string
): Promise<Post | null> => {
  const post = await db.post.findFirst({
    where: {
      id: id,
    },
    orderBy: {
      version: "desc",
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const newVersion = post.version + 1;

  const publishedPost = await db.post.update({
    where: {
      id: post.id,
    },
    data: {
      content: content ? content : post.content,
      published: true,
    },
  });

  if (!publishedPost) {
    throw new Error("Error publishing post");
  }

  const newPost = await db.post.create({
    data: {
      title: post.title,
      categoryId: post.categoryId,
      authorId: post.authorId,
      blob: camelize(post.title),
      version: newVersion,
      content: content ? content : post.content,
    },
  });

  return newPost;
};

export const deletePost = async (id: string): Promise<Post | null> => {
  const deletedPost = await db.post.delete({
    where: {
      id,
    },
  });
  return deletedPost;
};
