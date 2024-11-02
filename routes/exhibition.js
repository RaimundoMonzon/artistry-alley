import { Router } from "express";
import { ExhibitionController } from "../controllers/exhibition.js";
import asyncHandler from "express-async-handler";

const router = Router();

// Obtener todas las Exposiciones.
router.get("/", asyncHandler(ExhibitionController.getAllExhibitions));

// Obtener una Exposición por su ID.
router.get("/:id", asyncHandler(ExhibitionController.getExhibitionById));

// Crear una Exposición.
router.post("/", asyncHandler(ExhibitionController.createExhibition));

// Actualizar una Exposición.
router.put("/:id", asyncHandler(ExhibitionController.updateExhibition));

// Eliminar una Exposición.
router.delete("/:id", asyncHandler(ExhibitionController.deleteExhibition)); 

export default router;