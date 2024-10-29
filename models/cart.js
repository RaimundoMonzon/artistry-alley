import mongoose from "mongoose";
import { CART_TIMEOUT } from "../helpers/config.js";

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artwork",
          required: true,
        },
        title: String,
        price: Number,
        quantity: Number,
      },
    ], // Lista de items que se van a comprar.
    totalPrice: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now, expires: CART_TIMEOUT },
  },
  {
    collection: "carts", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
