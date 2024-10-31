import { CategoryService } from "../services/category.js";
import { messagesByLang as msg } from "../helpers/messages.js";

const categoryService = new CategoryService();

export class CategoryController {
    
    static async getAllCategories(req, res) {
        const categories = await categoryService.getAll();
        res.status(200).json(categories);
    }

    static async getCategoryById(req, res) {
        const category = await categoryService.getById({ id: req.params.id });
        res.status(200).json(category);
    }

    static async createCategory(req, res) {
        const category = await categoryService.create({ input: req.body });
        res.status(201).json(category);
    }

    static async updateCategory(req, res) {
        const category = await categoryService.update({ id: req.params.id, input: req.body });
        res.status(200).json(category);
    }

    static async deleteCategory(req, res) {
        const category = await categoryService.delete({ id: req.params.id });
        res.status(200).json(msg.deleteCategorySuccess);
    }
}