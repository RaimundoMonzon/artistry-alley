import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
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
  },
  {
    collection: "categories", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
);

export const Category = mongoose.model("Category", categorySchema);