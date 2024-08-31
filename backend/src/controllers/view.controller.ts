import * as postService from "../services/post.service";
import * as categoryService from "../services/category.service";
import { Request, Response } from "express";

export const getPostViewController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await postService.getPostBySlug(slug);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const headerContent = await categoryService
      .getAllCategories()
      .then((categories) =>
        categories.map((category) => {
          const uniquePosts = category.posts
            .map((post) => {
              return {
                title: post.title,
                blob: post.blob,
                published: post.published,
              };
            })
            .filter(
              (post, index, self) =>
                self.findIndex((p) => p.blob === post.blob) === index &&
                post.published
            );
          return { id: category.id, name: category.name, posts: uniquePosts };
        })
      );

    return res.render("pages/post", {
      post: post,
      headerContent: headerContent,
    });
  } catch (error) {
    console.error("Error getting post by slug:", error);
    return res.status(500).json({ error: (error as any).message });
  }
};

export const getPreViewPostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const headerContent = await categoryService
      .getAllCategories()
      .then((categories) =>
        categories.map((category) => {
          const uniquePosts = category.posts
            .map((post) => {
              return {
                title: post.title,
                blob: post.blob,
                published: post.published,
              };
            })
            .filter(
              (post, index, self) =>
                self.findIndex((p) => p.blob === post.blob) === index &&
                post.published
            );
          return { id: category.id, name: category.name, posts: uniquePosts };
        })
      );

    return res.render("pages/post", {
      post: post,
      headerContent: headerContent,
    });
  } catch (error) {
    console.error("Error getting post by slug:", error);
    return res.status(500).json({ error: (error as any).message });
  }
};
