import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import { validateToken, validateAdmin } from "../middlewares/validations.js";
import asyncHandler from "express-async-handler";

const router = Router();

// PUBLIC

// Obtener los artworks de un usuario.
router.get('/:userId/artworks', asyncHandler(UserController.getUserArtworks));

// Obtener los exhibitions de un usuario.
router.get('/:userId/exhibitions', asyncHandler(UserController.getUserExhibitions));

// ALL USERS

// Perfil del un usuario.
router.get('/profile', [validateToken], asyncHandler(UserController.getUserProfile));

router.patch('/profile', [validateToken], asyncHandler(UserController.updateUserProfile));


// ADMIN ONLY

// Eliminar artwork de un usuario.
router.delete('/:userId/artworks/:artworkId', [validateToken, validateAdmin], asyncHandler(UserController.removeArtworkFromUser));

// Eliminar exhibition de un usuario.
router.delete('/:userId/exhibitions/:exhibitionId', [validateToken, validateAdmin], asyncHandler(UserController.removeExhibitionFromUser));

// Obtener todos los usuarios.
router.get('/', [validateToken, validateAdmin], asyncHandler(UserController.getAllUsers));

// Obtener un usuario.
router.get('/:userId', [validateToken, validateAdmin], asyncHandler(UserController.getUser));

// Crear un usuario.
router.post('/', [validateToken, validateAdmin], asyncHandler(UserController.createUser));

// Actualizar un usuario.
router.put('/:userId', [validateToken, validateAdmin], asyncHandler(UserController.updateUser));

// Eliminar un usuario.
router.delete('/:userId', [validateToken, validateAdmin], asyncHandler(UserController.deleteUser));

// Agregar artwork a un usuario. router.post('/:userId/artworks/:artworkId', [validateToken, validateAdmin], asyncHandler(UserController.addArtworkToUser));

// Agregar exhibition a un usuario. router.post('/:userId/exhibitions/:exhibitionId', [validateToken, validateAdmin], asyncHandler(UserController.addExhibitionToUser));

export default router;