import { Category } from "@prisma/client";
import { db } from "../config/db";

export const getAllCategories = async () => {
  return await db.category.findMany({
    include: {
      posts: true,
    },
  });
};

export const getCategoryById = async (id: string) => {
  return await db.category.findUnique({
    where: {
      id,
    },
  });
};

export const createCategory = async (name: string) => {
  console.log(name);
  return await db.category.create({
    data: {
      name,
    },
  });
};

export const updateCategory = async (id: string, name: string) => {
  return await db.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};

export const deleteCategory = async (id: string) => {
  return await db.category.delete({
    where: {
      id,
    },
  });
};
