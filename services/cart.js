import { Cart } from "../models/cart.js";
import { NotFound, ValidationError } from "../helpers/errorHandler.js";
import { generateCartToken } from "../helpers/generateJWT.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class CartService {
    constructor() {
        this.model = Cart;
    }

    async createCart() {
        const cart = new this.model({ items: [], totalPrice: 0 });
        const savedCart = await cart.save();
        const cartToken = await generateCartToken(savedCart);
        return { cart: savedCart, token: cartToken };
    }

    async getAll() {
        return this.model.find({});
    }

    async getById(id) {
        const cart = await this.model.findById(id);
        if (!cart) {
            throw new NotFound(msg.cartNotFound);
        }
        return cart;
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

            return await cart.save()
        } else {
            throw new ValidationError(msg.itemAlreadyInCart);
        }
    }

    async updateItemQuantity({ id, itemId, quantity }) {
        const cart = await this.getById(id);
        const itemAlreadyInCart = cart.items.find(
            (item) => item._id.toString() === itemId.toString()
        );

        if (!itemAlreadyInCart) {
            throw new ValidationError(msg.noSuchItemInCart);
        }

        itemAlreadyInCart.quantity = quantity;
        return await cart.save();
    }

    async deleteItem({ id, itemId }) {
        const cart = await this.getById(id);
        const itemAlreadyInCart = cart.items.find(
            (item) => item._id.toString() === itemId.toString()
        );

        if (!itemAlreadyInCart) {
            throw new ValidationError(msg.noSuchItemInCart);
        }

        cart.items = cart.items.filter(
            (item) => item._id.toString() !== itemId.toString()
        );
        cart.totalPrice -= itemAlreadyInCart.price * itemAlreadyInCart.quantity;

        return await cart.save();
    }
}
