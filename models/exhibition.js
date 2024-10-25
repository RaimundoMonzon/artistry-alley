import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const exhibitionSchema = new mongoose.Schema(
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
    location: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [3, msg.minLength(3)],
      maxlength: [20, msg.maxLength(20)],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, msg.requiredField()],
    },
    featuredArtworks: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork", required: true },
        title : String,
        category : String,
        price : Number,
        forSale : Boolean,
        image : String,
      },
    ],
  },
  {
    collection: "exhibitions", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
);

export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);