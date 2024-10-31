import { Router } from "express";
import { CategoryController } from "../controllers/category.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const router = Router();

// Obtener todas las Categorias.
router.get("/", asyncHandler(CategoryController.getAllCategories));

// Obtener una Categoria por su ID.
router.get("/:id", asyncHandler(CategoryController.getCategoryById));

// Crear una Categoria.
router.post("/", asyncHandler(CategoryController.createCategory));

// Actualizar una Categoria.
router.put("/:id", asyncHandler(CategoryController.updateCategory));

// Eliminar una Categoria.
router.delete("/:id", asyncHandler(CategoryController.deleteCategory));

export default router;