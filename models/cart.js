import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const  cartSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            username : String,
        },
        items: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork", required: true },
                title : String,
                price : Number,
            },
        ], // Lista de items que se van a comprar.
        totalPrice: {type: Number, required: true, default: 0}, // Precio total del carrito.
    },
    {
        collection: "carts", // Nombre de la colección en la base de datos.
        versionKey: false, // Esto oculta el campo __v
        timestamps: true,
    },
);

export const Cart = mongoose.model("Cart", cartSchema);