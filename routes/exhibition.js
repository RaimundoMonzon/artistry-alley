import { Router } from "express";
import { ExhibitionController } from "../controllers/exhibition.js";
import asyncHandler from "express-async-handler";
import { validateAdmin, validateToken, validateExhibitionOwnership } from "../middlewares/validations.js";

const router = Router();

// ALL USERS

// Crear una Exposición.
router.post("/", [validateToken], asyncHandler(ExhibitionController.createExhibition));

// Actualizar una Exposición.
router.put("/:id", [validateToken, validateExhibitionOwnership], asyncHandler(ExhibitionController.updateExhibition));

// Eliminar una Exposición.
router.delete("/:id", [validateToken, validateExhibitionOwnership], asyncHandler(ExhibitionController.deleteExhibition));

// ADMIN ONLY

// Obtener todas las Exposiciones.
router.get("/", [validateToken, validateAdmin], asyncHandler(ExhibitionController.getAllExhibitions));

// Obtener una Exposición por su ID.
router.get("/:id", [validateToken, validateAdmin], asyncHandler(ExhibitionController.getExhibitionById));

export default router;