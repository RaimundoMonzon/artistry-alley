import mongoose from "mongoose";
import { messagesByLang as msg } from "../helpers/messages.js";

const exhibitionSchema = new mongoose.Schema(
  {
    title: {
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
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artwork",
          required: true,
        },
        title: String,
        image: String,
      },
    ],
  },
  {
    collection: "exhibitions", // Nombre de la colección en la base de datos.
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  }
);

exhibitionSchema.post("findByIdAndUpdate", async function (doc) {
  if (doc) {
    await mongoose.model("User").updateOne(
      { "exhibitions._id": doc._id },
      {
        $set: {
          "exhibitions.$.title": doc.title,
          "exhibitions.$.description": doc.description,
          "exhibitions.$.location": doc.location,
          "exhibitions.$.date": doc.date,
          "exhibitions.$.featuredArtworks": doc.featuredArtworks,
        },
      }
    );
  }
});

exhibitionSchema.post("findByIdAndDelete", async function (doc) {
  if (doc) {
    await mongoose.model("User").updateOne(
      { "exhibitions._id": doc._id },
      {
        $pull: {
          exhibitions: { _id: doc._id }
        }
      }
    );
  }
});

export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
