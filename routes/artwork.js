import { Router } from 'express';
import { ArtworkController } from '../controllers/artwork.js';

const router = Router();

// Obtener todos los artworks.
router.get('/', ArtworkController.getAllArtworks);

// Obtener un artwork.
router.get('/:id', ArtworkController.getArtwork);

// Crear un artwork.
router.post('/', ArtworkController.createArtwork);

// Actualizar un artwork.
router.put('/:id', ArtworkController.updateArtwork);

// Eliminar un artwork.
router.delete('/:id', ArtworkController.deleteArtwork);      

export default router;