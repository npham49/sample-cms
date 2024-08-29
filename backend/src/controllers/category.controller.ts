import { Request, Response } from "express";
import * as categoryService from "../services/category.service";

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryService.updateCategory(id, name);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};
