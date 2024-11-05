import { Router } from 'express';
import { AuthController } from '../controllers/auth.js';
import asyncHandler from "express-async-handler";
import { validateToken } from '../middlewares/validations.js';

const router = Router();

// Registro de usuario.
router.post('/register', asyncHandler(AuthController.registerUser));

// Login de usuario.
router.post('/login', asyncHandler(AuthController.loginUser));

// Logout de usuario.
router.post('/logout', [validateToken], asyncHandler(AuthController.logoutUser));

export default router;