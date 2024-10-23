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
  },
  {
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
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