import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import { validateToken, validateRol } from "../middlewares/validations.js";
import { asyncHandler } from '../helpers/asyncHandler.js';

const router = Router();

// Obtener todos los usuarios.
router.get('/', [validateToken], asyncHandler(UserController.getAllUsers));

// Obtener un usuario.
router.get('/:userId', [validateToken], asyncHandler(UserController.getUser));

// Crear un usuario.
router.post('/', [validateToken], asyncHandler(UserController.createUser));

// Actualizar un usuario.
router.put('/:userId', [validateToken], asyncHandler(UserController.updateUser));

// Eliminar un usuario.
router.delete('/:userId', [validateToken], asyncHandler(UserController.deleteUser));

// Agregar artwork a un usuario.
router.post('/:userId/artworks/:artworkId', [validateToken], asyncHandler(UserController.addArtworkToUser));

// Eliminar artwork de un usuario.
router.delete('/:userId/artworks/:artworkId', [validateToken], asyncHandler(UserController.removeArtworkFromUser));

// Agregar exhibition a un usuario.
router.post('/:userId/exhibitions/:exhibitionId', [validateToken], asyncHandler(UserController.addExhibitionToUser));

// Eliminar exhibition de un usuario.
router.delete('/:userId/exhibitions/:exhibitionId', [validateToken], asyncHandler(UserController.removeExhibitionFromUser));

export default router;