import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { messagesByLang as msg } from "../helpers/messages.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [3, msg.minLength(3)],
      maxlength: [20, msg.maxLength(20)],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, msg.requiredField()],
      minlength: [6, msg.minLength(6)],
    },
    rol: {
      type: String,
      required: [true, msg.requiredField()],
      enum: ["admin", "user"],
      default: "user",
    },
    email: {
      type: String,
      required: [true, msg.requiredField()],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        msg.invalidEmail,
      ],
    },
    artworks: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artwork",
          required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        categories: [{ name: { type: String, required: true } }],
        image: { type: String, required: true },
      },
    ],
    exhibitions: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exhibition",
          required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: Date, required: true },
        featuredArtworks: [
          {
            title: { type: String, required: true },
            image: { type: String, required: true },
          },
        ],
      },
    ],
  },
  {
    collection: "users", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  }
);

// Middleware de Encriptacion.
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Eliminar la contraseña del resultado JSON
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
