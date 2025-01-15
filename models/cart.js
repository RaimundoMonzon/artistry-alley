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
    expireAt: { type: Date, default: Date.now, expires: CART_TIMEOUT },
  },
  {
    collection: "carts", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  }
);

cartSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    const bulkOperations = doc.items.map((item) => ({
      updateOne: {
        filter: { "artworks._id": item._id },
        update: { $inc: { "artworks.$.stock": -item.quantity } },
      },
    }));

    await mongoose.model("User").bulkWrite(bulkOperations);
  }
});

export const Cart = mongoose.model("Cart", cartSchema);
