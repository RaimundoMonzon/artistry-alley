import { Router } from 'express';
import { AuthController } from '../controllers/auth.js';

const router = Router();

// Registro de usuario.
router.post('/register', AuthController.registerUser);

// Login de usuario.
router.post('/login', AuthController.loginUser);

export default router;