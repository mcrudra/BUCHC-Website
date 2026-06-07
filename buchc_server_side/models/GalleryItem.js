import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "/logo-Ba1-O6YK.png",
    },
  },
  {
    timestamps: true,
  },
);

const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);

export default GalleryItem;
