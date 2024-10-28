import { CartService } from "../services/cart.js";
import { ArtworkService } from "../services/artwork.js";

const cartService = new CartService();
const artworkService = new ArtworkService();

export class CartController {

    // Obtener todos los carritos.  
    static async getAllCarts(req, res) {
        const carts = await cartService.getAll();
        res.status(200).json(carts);
    }

    // Obtener un carrito.
    static async getCart(req, res) {
        const { id } = req.params;
        const cart = await cartService.getById(id);
        res.status(200).json(cart);
    }

    // Crear un carrito.
    static async createCart(req, res) {
        const cart = await cartService.createCart();
        res.status(201).json(cart);
    }

    // Agregar un artwork al carrito.
    static async addItemToCart(req, res) {
        const { id } = req.params;
        const { newItemId, quantity } = req.body;
        const newItem = await artworkService.getById(newItemId);
        // A diferencia del update y delete item, el add espera el objeto completo.
        const cart = await cartService.addItem({ id, newItem, quantity });
        res.status(200).json(cart);
    }
    
    // Eliminar un artwork del carrito.
    static async deleteItemFromCart(req, res) {
        const { id } = req.params;
        const { itemId } = req.body;
        const cart = await cartService.deleteItem({ id, itemId });
        res.status(200).json(cart);
    }

    // Actualizar el cantidad de artwork en el carrito.
    static async updateItemQuantity(req, res) {
        const { id } = req.params;
        const { itemId, quantity } = req.body;
        const cart = await cartService.updateItemQuantity({ id, itemId, quantity });
        res.status(200).json(cart);
    }
}