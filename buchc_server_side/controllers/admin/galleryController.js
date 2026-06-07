import GalleryItem from "../../models/GalleryItem.js";
import {
  uploadToCloudinary,
  extractPublicId,
  deleteFromCloudinary,
} from "../../utils/cloudinary.js";

const DEFAULT_GALLERY_IMAGE = "/logo-Ba1-O6YK.png";
const MAX_DESCRIPTION_CHARS = 330;

export const getGalleryItems = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGalleryItem = async (req, res) => {
  try {
    const isNew = req.params.id === "new";

    if (isNew) {
      return res.json({
        _id: "new",
        title: "",
        description: "",
        image: DEFAULT_GALLERY_IMAGE,
      });
    }

    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const data = req.body;

    if ((data.description || "").length > MAX_DESCRIPTION_CHARS) {
      return res.status(400).json({
        message: `Description cannot exceed ${MAX_DESCRIPTION_CHARS} characters`,
      });
    }

    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          "gallery-items",
        );
        data.image = uploadResult.url;
      } catch (uploadError) {
        console.error("Gallery image upload error:", uploadError);
        return res.status(500).json({
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    }

    if (!data.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!data.image) {
      data.image = DEFAULT_GALLERY_IMAGE;
    }

    const item = await GalleryItem.create(data);
    res.status(201).json(item);
  } catch (error) {
    console.error("Create gallery item error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const data = req.body;

    if ((data.description || "").length > MAX_DESCRIPTION_CHARS) {
      return res.status(400).json({
        message: `Description cannot exceed ${MAX_DESCRIPTION_CHARS} characters`,
      });
    }

    if (req.file) {
      try {
        const existingItem = await GalleryItem.findById(req.params.id);
        if (existingItem && existingItem.image) {
          const oldPublicId = extractPublicId(existingItem.image);
          if (oldPublicId) {
            try {
              await deleteFromCloudinary(oldPublicId);
            } catch (deleteError) {
              console.error("Error deleting old gallery image:", deleteError);
            }
          }
        }

        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          "gallery-items",
        );
        data.image = uploadResult.url;
      } catch (uploadError) {
        console.error("Gallery image upload error:", uploadError);
        return res.status(500).json({
          message: "Failed to upload image",
          error: uploadError.message,
        });
      }
    } else {
      const existingItem = await GalleryItem.findById(req.params.id);
      if (existingItem && existingItem.image) {
        data.image = data.image || existingItem.image;
      } else if (!data.image) {
        data.image = DEFAULT_GALLERY_IMAGE;
      }
    }

    const item = await GalleryItem.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Update gallery item error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    if (item.image) {
      const publicId = extractPublicId(item.image);
      if (publicId) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (deleteError) {
          console.error(
            "Error deleting gallery image from Cloudinary:",
            deleteError,
          );
        }
      }
    }

    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
