import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [3, msg.minLength(3)],
      maxlength: [30, msg.maxLength(30)],
      trim: true,
    },
    description: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [20, msg.minLength(20)],
      maxlength: [200, msg.maxLength(200)],
      trim: true,
    },
  },
  {
    collection: "categories", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  }
);

// Actualiza las Categorias del Artwork.
categorySchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await mongoose.model("Artwork").updateMany(
      { "categories._id": doc._id },
      {
        $set: {
          "categories.$[elem].name": doc.name,
          "categories.$[elem].description": doc.description,
        },
      },
      { arrayFilters: [{ "elem._id": doc._id }] }
    );
  }
});

// Elimina la Categoria del Artwork.
categorySchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await mongoose.model("Artwork").updateMany(
      { "categories._id": doc._id },
      {
        $pull: {
          categories: { _id: doc._id }
        }
      }
    );
  }
});

export const Category = mongoose.model("Category", categorySchema);
