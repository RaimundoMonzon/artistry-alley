import { Router } from "express";
import { CategoryController } from "../controllers/category.js";
import asyncHandler from "express-async-handler";
import { validateToken, validateAdmin } from "../middlewares/validations.js";

const router = Router();

// Obtener todas las Categorias.
router.get("/", asyncHandler(CategoryController.getAllCategories));

// Crear una Categoria.
router.post("/", [validateToken, validateAdmin],  asyncHandler(CategoryController.createCategory));

// Actualizar una Categoria.
router.put("/:id", [validateToken, validateAdmin],  asyncHandler(CategoryController.updateCategory));

// Eliminar una Categoria.
router.delete("/:id", [validateToken, validateAdmin],  asyncHandler(CategoryController.deleteCategory));

export default router;