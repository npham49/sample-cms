export type Post = {
  id: string;
  title: string;
  postId: string;
  blob: string;
  content: string | null;
  published: boolean;
  authorId: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PostCreate = {
  title: string;
  content: string | null;
  published: boolean;
  categoryId: string;
};

export type PostUpdate = {
  title: string;
  postId: string;
  content: string | null;
  published: boolean;
};

export type PostDelete = {
  postId: string;
};

export type PostGet = {
  postId: string;
};

export type Category = {
  id: string;
  name: string;
  posts: Post[];
};
