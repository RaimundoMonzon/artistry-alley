import { Cart } from "../models/cart.js";
import { ValidationError } from "../helpers/errorHandler.js";
import { generateCartToken } from "../helpers/generateJWT.js";

export class CartService {
  constructor() {
    this.model = Cart;
  }

  async createCart() {
    const cart = new this.model({ items: [], totalPrice: 0 });
    try {
      const savedCart = await cart.save();
      const cartToken = await generateCartToken(savedCart);
      return { cart: savedCart, token: cartToken };
    } catch (error) {
      throw new ValidationError("Error al crear el carrito");
    }
  }

  async getAll() {
    return this.model.find({});
  }

  async getById(id) {
    const cart = await this.model.findById(id);
    if (!cart) {
      throw new ValidationError("El carrito no existe");
    }
    return cart;
  }

  async saveCart(cart, errorMessage) {
    try {
      return await cart.save();
    } catch (error) {
      throw new ValidationError(errorMessage);
    }
  }

  async addItem({ id, newItem, quantity }) {
    const cart = await this.getById(id);
    const itemAlreadyInCart = cart.items.find(
      (item) => item._id.toString() === newItem._id.toString()
    );
    if (!itemAlreadyInCart) {
      cart.items.push({
        _id: newItem._id,
        title: newItem.title,
        price: newItem.price,
        quantity: quantity,
      });
      cart.totalPrice += newItem.price * quantity;

      return await this.saveCart(
        cart,
        "Error al agregar el artwork al carrito"
      );
    } else {
      throw new ValidationError("El artwork ya está en el carrito");
    }
  }

  async updateItemQuantity({ id, itemId, quantity }) {
    const cart = await this.getById(id);
    const itemAlreadyInCart = cart.items.find(
      (item) => item._id.toString() === itemId.toString()
    );

    if (!itemAlreadyInCart) {
      throw new ValidationError("El artwork no está en el carrito");
    }

    itemAlreadyInCart.quantity = quantity;
    return await this.saveCart(
      cart,
      "Error al actualizar el artwork en el carrito"
    );
  }

  async deleteItem({ id, itemId }) {
    const cart = await this.getById(id);
    const itemAlreadyInCart = cart.items.find(
      (item) => item._id.toString() === itemId.toString()
    );

    if (!itemAlreadyInCart) {
      throw new ValidationError("El artwork no está en el carrito");
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== itemId.toString()
    );
    cart.totalPrice -= itemAlreadyInCart.price * itemAlreadyInCart.quantity;

    return await this.saveCart(
      cart,
      "Error al eliminar el artwork del carrito"
    );
  }
}
