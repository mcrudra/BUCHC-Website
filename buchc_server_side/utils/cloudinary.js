import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} folder - Folder name in Cloudinary (e.g., 'events', 'team-members')
 * @param {string} publicId - Optional public ID for the image
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadToCloudinary = async (fileBuffer, folder, publicId = null) => {
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            folder: `buchc/${folder}`,
            resource_type: 'image',
            quality: 'auto',
        };

        if (publicId) {
            uploadOptions.public_id = publicId;
        }

        cloudinary.uploader
            .upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                        width: result.width,
                        height: result.height,
                    });
                }
            })
            .end(fileBuffer);
    });
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} Cloudinary deletion result
 */
export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw error;
    }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} Public ID or null
 */
export const extractPublicId = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
        return null;
    }

    // Extract public_id from URL like: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
    const match = url.match(/\/upload\/[^/]+\/(.+)$/);
    if (match) {
        // Remove file extension
        return match[1].replace(/\.[^.]+$/, '');
    }
    return null;
};

export default cloudinary;

