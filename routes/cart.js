import { Router } from 'express';
import { CartController } from '../controllers/cart.js';

const router = Router();

// Obtener todos los carritos.
router.get('/', CartController.getAllCarts);

// Obtener un carrito.
router.get('/:id', CartController.getCart);

// Crear un carrito.
router.post('/', CartController.createCart);

// Agregar un artwork al carrito.
router.put('/:id', CartController.addItemToCart);

// Eliminar un artwork del carrito.
router.delete('/:id', CartController.deleteItemFromCart);

// Actualizar el cantidad de artwork en el carrito.
router.put('/:id', CartController.updateItemQuantity);

export default router;