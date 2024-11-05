import { Router } from 'express';
import { ArtworkController } from '../controllers/artwork.js';
import asyncHandler from "express-async-handler";
import { validateToken, validateAdmin, validateArtworkOwnership } from "../middlewares/validations.js";

const router = Router();

// ALL USERS

// Crear un artwork.
router.post('/', [validateToken], asyncHandler(ArtworkController.createArtwork));

// Actualizar un artwork.
router.put('/:id', [validateToken, validateArtworkOwnership], asyncHandler(ArtworkController.updateArtwork));

// Eliminar un artwork.
router.delete('/:id', [validateToken, validateArtworkOwnership], asyncHandler(ArtworkController.deleteArtwork));

// ADMIN ONLY

// Eliminar un artwork.
router.delete('/admin/:id', [validateToken, validateAdmin], asyncHandler(ArtworkController.deleteArtwork));

// Obtener todos los artworks.
router.get('/', [validateToken, validateAdmin], asyncHandler(ArtworkController.getAllArtworks));

// Obtener un artwork.
router.get('/:id', [validateToken, validateAdmin], asyncHandler(ArtworkController.getArtwork));

export default router;