import { Router } from 'express';
import { CartController } from '../controllers/cart.js';
import asyncHandler from "express-async-handler";

const router = Router();

// Rutas de carrito.
// Obtener todos los carritos.
router.get('/', asyncHandler(CartController.getAllCarts));

// Obtener un carrito.
router.get('/:id', asyncHandler(CartController.getCart));

// Crear un carrito.
router.post('/', asyncHandler(CartController.createCart));


// Operaciones del carrito.
// Agregar un artwork al carrito.
router.put('/addItem/:itemId', asyncHandler(CartController.addItemToCart));

// Eliminar un artwork del carrito.
router.delete('/deleteItem/:itemId', asyncHandler(CartController.deleteItemFromCart));

// Actualizar el cantidad de artwork en el carrito.
router.put('/updateItem/:itemId', asyncHandler(CartController.updateItemQuantity));

// Borrar el carrito de la sesión actual.
router.post('/clear', asyncHandler(CartController.clearCart));

export default router;