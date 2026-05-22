import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
    const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error('❌ Missing Cloudinary environment variables:', missing.join(', '));
        throw new Error(`Missing Cloudinary configuration: ${missing.join(', ')}`);
    }
    
    return true;
};

// Configure Cloudinary
try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    // Validate configuration on module load
    validateCloudinaryConfig();
    console.log('✅ Cloudinary configured successfully');
} catch (error) {
    console.error('❌ Cloudinary configuration error:', error.message);
}

/**
 * Upload image to Cloudinary
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} folder - Folder name in Cloudinary (e.g., 'events', 'team-members')
 * @param {string} publicId - Optional public ID for the image
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadToCloudinary = async (fileBuffer, folder, publicId = null) => {
    // Validate configuration before upload
    try {
        validateCloudinaryConfig();
    } catch (error) {
        throw new Error(`Cloudinary not configured: ${error.message}`);
    }

    // Validate file buffer
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
        throw new Error('Invalid file buffer provided');
    }

    if (fileBuffer.length === 0) {
        throw new Error('File buffer is empty');
    }

    return new Promise((resolve, reject) => {
        const uploadOptions = {
            folder: `buchc/${folder}`,
            resource_type: 'image',
            quality: 'auto',
        };

        if (publicId) {
            uploadOptions.public_id = publicId;
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', {
                        message: error.message,
                        http_code: error.http_code,
                        name: error.name
                    });
                    reject(new Error(`Cloudinary upload failed: ${error.message}`));
                } else if (!result || !result.secure_url) {
                    console.error('Cloudinary upload returned invalid result:', result);
                    reject(new Error('Cloudinary upload returned invalid result'));
                } else {
                    console.log('✅ Image uploaded successfully to Cloudinary');
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                        width: result.width,
                        height: result.height,
                    });
                }
            }
        );

        uploadStream.on('error', (error) => {
            console.error('Upload stream error:', error);
            reject(new Error(`Upload stream error: ${error.message}`));
        });

        uploadStream.end(fileBuffer);
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

