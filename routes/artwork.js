import { Router } from 'express';
import { ArtworkController } from '../controllers/artwork.js';
import { asyncHandler } from '../helpers/asyncHandler.js';

const router = Router();

// Obtener todos los artworks.
router.get('/', asyncHandler(ArtworkController.getAllArtworks));

// Obtener un artwork.
router.get('/:id', asyncHandler(ArtworkController.getArtwork));

// Crear un artwork.
router.post('/', asyncHandler(ArtworkController.createArtwork));

// Actualizar un artwork.
router.put('/:id', asyncHandler(ArtworkController.updateArtwork));

// Eliminar un artwork.
router.delete('/:id', asyncHandler(ArtworkController.deleteArtwork));

export default router;