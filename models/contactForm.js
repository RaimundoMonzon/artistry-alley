import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const contactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [3, msg.minLength(3)],
      maxlength: [20, msg.maxLength(20)],
      trim: true,
    },
    email: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [3, msg.minLength(3)],
      maxlength: [20, msg.maxLength(20)],
      trim: true,
    },
    message: {
      type: String,
      required: [true, msg.requiredField()],
      maxlength: [1000, msg.maxLength(1000)],
      trim: true,
    },
  },
  {
    collection: "contactForms", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
);

export const ContactForm = mongoose.model("ContactForm", contactFormSchema);