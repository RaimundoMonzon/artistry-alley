import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [3, msg.minLength(3)],
      maxlength: [20, msg.maxLength(20)],
      trim: true,
    },
    description: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [20, msg.minLength(20)],
      maxlength: [200, msg.maxLength(200)],
      trim: true,
    },
    forSale: {
      type: Boolean,
      required: [true, msg.requiredField()],
      default: false, // Por default no esta a la venta.
    },
    price: {
      type: Number,
      min: [1, msg.minLength(1)],
      trim: true,
      // Valida si el Articulo está o no en venta, y si es así, validar el precio.
      validate: {
        validator: function (value) {
          return (
            !this.forSale || (this.forSale && value !== undefined && value > 0)
          );
        },
        message: msg.requiredField(),
      },
    },
    stock: {
      type: Number,
      min: [1, msg.minLength(1)],
      default: 1,
      validate: {
        validator: function (value) {
          return (
            !this.forSale || (this.forSale && value !== undefined && value > 0)
          );
        },
        message: msg.requiredField(),
      },
    },
    categories: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        name: String,
        description: String,
      },
    ],
    image: {
      type: String,
      required: [true, msg.requiredField()],
      trim: true,
    },
  },
  {
    collection: "artworks", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  }
);

artworkSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await mongoose.model("User").updateOne(
      { "artworks._id": doc._id },
      {
        $set: {
          "artworks.$.name": doc.name,
          "artworks.$.description": doc.description,
          "artworks.$.image": doc.image,
          "artworks.$.categories": doc.categories,
          "artworks.$.forSale": doc.forSale,
          "artworks.$.price": doc.price,
          "artworks.$.stock": doc.stock,
        },
      }
    );
  }
});

artworkSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await mongoose.model("User").updateOne(
      { "artworks._id": doc._id },
      {
        $pull: {
          artworks: { _id: doc._id }
        }
      }
    );
  }
});

export const Artwork = mongoose.model("Artwork", artworkSchema);
