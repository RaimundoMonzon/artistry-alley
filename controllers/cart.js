import { CartService } from "../services/cart.js";
import { ArtworkService } from "../services/artwork.js";
import { messagesByLang as msg } from "../helpers/messages.js";

const cartService = new CartService();
const artworkService = new ArtworkService();

export class CartController {

  //Obtener todos los carritos, solo para operaciones terminadas.
  static async getAllCarts(req, res) {
    const carts = await cartService.getAll();
    res.status(200).json(carts);
  }
  //Obtener un carrito, solo para operaciones terminadas.
  static async getCartById(req, res) {
    const cart = await cartService.getById(req.params.id);
    res.status(200).json(cart);
  }

  // Crear un carrito.
  static async createCart(req, res) {
    const cart = await cartService.createCart(req.session);
    res.status(201).json(cart);
  }

  // Obtener el carrito de la sesión.
  static async getCurrentCart(req, res) {
    const cart = await cartService.getCart(req.session);
    res.status(200).json(cart);
  }

  // Agregar un artwork al carrito.
  static async addItemToCart(req, res) {
    const newItem = await artworkService.getById(req.params.itemId);
    const quantity = req.body.quantity;

    const effectiveQuantity = Math.min(Math.max(quantity, 1), newItem.stock);

    const cart = await cartService.addItem(req.session, newItem, effectiveQuantity);

    res.status(200).json(cart);
  }

  // Eliminar un artwork del carrito.
  static async deleteItemFromCart(req, res) {
    const cart = await cartService.deleteItem(req.session, req.params.itemId);
    res.status(200).json(cart);
  }

  // Actualizar el cantidad de artwork en el carrito.
  static async updateItemQuantity(req, res) {
    const newItem = await artworkService.getById(req.params.itemId);
    const quantity = req.body.quantity;

    if(quantity < 1) {
      const cart = await cartService.deleteItem(req.session, req.params.itemId);
      res.status(200).json(cart);
    } else {
      const effectiveQuantity = Math.min(Math.max(quantity, 1), newItem.stock);
      const cart = await cartService.updateItemQuantity(req.session, req.params.itemId, effectiveQuantity);
      res.status(200).json(cart);
    }
  }

  static async clearCart(req, res) {
    req.session.cart = null;
    res.status(200).json({ message: msg.cartCleared });
  }

}
