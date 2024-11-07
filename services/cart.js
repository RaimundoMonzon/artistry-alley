import { Cart } from "../models/cart.js";
import { NotFound, ValidationError } from "../helpers/errorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { SAVED_CART_TIMEOUT } from "../helpers/config.js";

export class CartService {
    constructor() {
        this.model = Cart;
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

    async createCart(session) {
        if (!session.cart) {
            const cart = new this.model({ items: [], totalPrice: 0 });
            cart.save();
            session.cart = cart;
        }
        return session.cart;
    }

    async getCart(session) {
        if (!session.cart) {
            throw new NotFound(msg.cartNotFound);
        }
        return session.cart;
    }

    async addItem(session, newItem, quantity) {
        if (!session.cart) { this.createCart(session); }

        const itemAlreadyInCart = session.cart.items.find(
            (item) => item._id.toString() === newItem._id.toString()
        );

        if (itemAlreadyInCart) { throw new ValidationError(msg.itemAlreadyInCart); }

        session.cart.items.push({
            _id: newItem._id,
            title: newItem.title,
            price: newItem.price,
            quantity: quantity,
        });
        session.cart.totalPrice += newItem.price * quantity;

        return session.cart;
    }

    async updateItemQuantity(session, itemId, quantity) {
        if (!session.cart) { throw new NotFound(msg.cartNotFound); }

        const itemAlreadyInCart = session.cart.items.find(
            (item) => item._id.toString() === itemId.toString()
        );

        if (!itemAlreadyInCart) { throw new ValidationError(msg.noSuchItemInCart); }

        session.cart.totalPrice += (quantity - itemAlreadyInCart.quantity) * itemAlreadyInCart.price;
        itemAlreadyInCart.quantity = quantity;
        return session.cart;
    }

    async deleteItem(session, itemId) {
        if (!session.cart) { throw new NotFound(msg.cartNotFound); }

        const itemAlreadyInCart = session.cart.items.find(
            (item) => item._id.toString() === itemId.toString()
        );

        if (!itemAlreadyInCart) { throw new ValidationError(msg.noSuchItemInCart); }

        session.cart.totalPrice -= itemAlreadyInCart.price * itemAlreadyInCart.quantity;

        session.cart.items = session.cart.items.filter(
            (item) => item._id.toString() !== itemId.toString()
        );

        return session.cart;
    }

    async extendCartExpiration(session) {
        await this.model.findOneAndUpdate(
            { _id: session.cart._id },
            {
                $set: { expireAt: Date.now() + SAVED_CART_TIMEOUT }
            }
        );
    }
}
