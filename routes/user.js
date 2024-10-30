import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import { validateToken, validateRol } from "../middlewares/validations.js";
import { asyncHandler } from '../helpers/asyncHandler.js';

const router = Router();

// Obtener todos los usuarios.
router.get('/', [validateToken], asyncHandler(UserController.getAllUsers));

// Obtener un usuario.
router.get('/:id', [validateToken], asyncHandler(UserController.getUser));

// Crear un usuario.
router.post('/', [validateToken], asyncHandler(UserController.createUser));

// Actualizar un usuario.
router.put('/:id', [validateToken], asyncHandler(UserController.updateUser));

// Eliminar un usuario.
router.delete('/:id', [validateToken], asyncHandler(UserController.deleteUser));

export default router;