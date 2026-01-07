import { uploadToCloudinary } from '../../utils/cloudinary.js';

/**
 * Upload image to Cloudinary
 * POST /admin/upload/image
 * Body: multipart/form-data with 'image' field
 * Query: ?folder=events|team-members
 */
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const folder = req.query.folder || 'general';
    const allowedFolders = ['events', 'team-members', 'general'];
    
    if (!allowedFolders.includes(folder)) {
      return res.status(400).json({ message: 'Invalid folder. Allowed: events, team-members, general' });
    }

    const result = await uploadToCloudinary(req.file.buffer, folder);
    
    res.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

