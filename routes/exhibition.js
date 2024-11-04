import { Router } from "express";
import { ExhibitionController } from "../controllers/exhibition.js";
import asyncHandler from "express-async-handler";
import { validateAdmin, validateToken } from "../middlewares/validations.js";

const router = Router();

// Obtener todas las Exposiciones.
router.get("/", [validateToken, validateAdmin], asyncHandler(ExhibitionController.getAllExhibitions));

// Obtener una Exposición por su ID.
router.get("/:id", [validateToken, validateAdmin], asyncHandler(ExhibitionController.getExhibitionById));

// Crear una Exposición.
router.post("/", [validateToken, validateAdmin], asyncHandler(ExhibitionController.createExhibition));

// Actualizar una Exposición.
router.put("/:id", [validateToken, validateAdmin], asyncHandler(ExhibitionController.updateExhibition));

// Eliminar una Exposición.
router.delete("/:id", [validateToken, validateAdmin], asyncHandler(ExhibitionController.deleteExhibition));

export default router;