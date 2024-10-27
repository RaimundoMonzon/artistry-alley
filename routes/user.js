import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import { validateToken, validateRol } from "../middlewares/validations.js";

const router = Router();

// Obtener todos los usuarios.
router.get('/', [validateToken], UserController.getAllUsers);

// Obtener un usuario.
router.get('/:id', [validateToken], UserController.getUser);

// Crear un usuario.
router.post('/', [validateToken], UserController.createUser);

// Actualizar un usuario.
router.put('/:id', [validateToken], UserController.updateUser);

// Eliminar un usuario.
router.delete('/:id', [validateToken], UserController.deleteUser);

export default router;