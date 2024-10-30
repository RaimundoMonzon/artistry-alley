import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";
import { CONTACT_FORM_TIMEOUT } from "../helpers/config.js";

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
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email inválido",
      ],
    },
    message: {
      type: String,
      required: [true, msg.requiredField()],
      maxlength: [1000, msg.maxLength(1000)],
      trim: true,
    },
    expireAt: { type: Date, default: Date.now, expires: CONTACT_FORM_TIMEOUT },
  },
  {
    collection: "contactForms", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
);

export const ContactForm = mongoose.model("ContactForm", contactFormSchema);