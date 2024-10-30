import { Router } from 'express';
import { CartController } from '../controllers/cart.js';
import { asyncHandler } from '../helpers/asyncHandler.js';

const router = Router();

// Obtener todos los carritos.
router.get('/', asyncHandler(CartController.getAllCarts));

// Obtener un carrito.
router.get('/:id', asyncHandler(CartController.getCart));

// Crear un carrito.
router.post('/', asyncHandler(CartController.createCart));

// Agregar un artwork al carrito.
router.put('/:id', asyncHandler(CartController.addItemToCart));

// Eliminar un artwork del carrito.
router.delete('/:id', asyncHandler(CartController.deleteItemFromCart));

// Actualizar el cantidad de artwork en el carrito.
router.put('/:id', asyncHandler(CartController.updateItemQuantity));

export default router;