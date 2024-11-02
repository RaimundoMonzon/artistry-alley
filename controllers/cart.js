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
    const cart = await cartService.getById(req.params.id);
    res.status(200).json(cart);
  }

  // Crear un carrito.
  static async createCart(req, res) {
    const { cart, token } = await cartService.createCart();
    res.status(201).json({ cart, token });
  }

  // Agregar un artwork al carrito.
  static async addItemToCart(req, res) {
    const newItem = await artworkService.getById(req.params.newItemId);
    // A diferencia del update y delete item, el add espera el objeto completo.
    const cart = await cartService.addItem({ id: req.params.id, newItem: newItem, quantity: req.body.quantity });
    res.status(200).json(cart);
  }

  // Eliminar un artwork del carrito.
  static async deleteItemFromCart(req, res) {
    const cart = await cartService.deleteItem({ id: req.params.id, itemId: req.body.itemId });
    res.status(200).json(cart);
  }

  // Actualizar el cantidad de artwork en el carrito.
  static async updateItemQuantity(req, res) {
    const cart = await cartService.updateItemQuantity({ id: req.params.id, itemId: req.body.itemId, quantity: req.body.quantity });
    res.status(200).json(cart);
  }

}
