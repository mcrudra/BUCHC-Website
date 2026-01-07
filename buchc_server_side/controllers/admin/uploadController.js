import { uploadToCloudinary } from '../../utils/cloudinary.js';

/**
 * Upload image to Cloudinary
 * POST /admin/upload/image
 * Body: multipart/form-data with 'image' field
 * Query: ?folder=events|team-members
 */
export const uploadImage = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ 
        message: 'No image file provided',
        error: 'Please select an image file to upload'
      });
    }

    // Validate file buffer
    if (!req.file.buffer || req.file.buffer.length === 0) {
      console.error('File buffer is empty or invalid');
      return res.status(400).json({ 
        message: 'Invalid file',
        error: 'The uploaded file is empty or corrupted'
      });
    }

    // Validate file size (additional check)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.buffer.length > maxSize) {
      console.error('File too large:', req.file.buffer.length);
      return res.status(400).json({ 
        message: 'File too large',
        error: 'File size must be less than 5MB'
      });
    }

    const folder = req.query.folder || 'general';
    const allowedFolders = ['events', 'team-members', 'general'];
    
    if (!allowedFolders.includes(folder)) {
      return res.status(400).json({ 
        message: 'Invalid folder',
        error: `Invalid folder. Allowed: ${allowedFolders.join(', ')}`
      });
    }

    console.log(`Uploading image to folder: ${folder}, size: ${req.file.buffer.length} bytes`);
    const result = await uploadToCloudinary(req.file.buffer, folder);
    
    if (!result || !result.url) {
      throw new Error('Upload succeeded but no URL returned');
    }

    console.log('✅ Image uploaded successfully:', result.url);
    res.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Image upload error:', {
      message: error.message,
      stack: error.stack,
      fileInfo: req.file ? {
        size: req.file.buffer?.length,
        mimetype: req.file.mimetype,
        originalname: req.file.originalname
      } : 'No file'
    });
    
    // Provide more specific error messages
    let errorMessage = 'Failed to upload image';
    if (error.message.includes('Cloudinary not configured')) {
      errorMessage = 'Image upload service is not configured. Please contact administrator.';
    } else if (error.message.includes('Invalid file buffer')) {
      errorMessage = 'Invalid file. Please try uploading a different image.';
    } else {
      errorMessage = error.message || 'Failed to upload image';
    }

    res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

