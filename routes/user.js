import { Router } from 'express';
import { UserController } from '../controllers/user.js';

const router = Router();

// Obtener todos los usuarios.
router.get('/', UserController.getAllUsers);

// Obtener un usuario.
router.get('/:id', UserController.getUser);

// Crear un usuario.
router.post('/', UserController.createUser);

// Actualizar un usuario.
router.put('/:id', UserController.updateUser);

// Eliminar un usuario.
router.delete('/:id', UserController.deleteUser);

export default router;