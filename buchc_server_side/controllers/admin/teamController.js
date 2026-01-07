import TeamMember from '../../models/TeamMember.js';
import { body, validationResult } from 'express-validator';
import { uploadToCloudinary, extractPublicId, deleteFromCloudinary } from '../../utils/cloudinary.js';

export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamMember = async (req, res) => {
  try {
    const isNew = req.params.id === 'new';

    if (isNew) {
      return res.json({
        _id: 'new',
        name: '',
        position: '',
        department: 'governing',
        photo: '',
        mail: ''
      });
    }

    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const data = req.body;

    // Handle image upload if file is provided
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.buffer, 'team-members');
        data.photo = uploadResult.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({ message: 'Failed to upload image', error: uploadError.message });
      }
    }

    // Validate required fields
    if (!data.name || !data.position || !data.department) {
      return res.status(400).json({ message: 'Name, position, and department are required' });
    }

    const teamMember = await TeamMember.create(data);
    res.status(201).json(teamMember);
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const data = req.body;

    // Handle image upload if file is provided
    if (req.file) {
      try {
        // Get existing team member to delete old image
        const existingMember = await TeamMember.findById(req.params.id);
        if (existingMember && existingMember.photo) {
          const oldPublicId = extractPublicId(existingMember.photo);
          if (oldPublicId) {
            try {
              await deleteFromCloudinary(oldPublicId);
            } catch (deleteError) {
              console.error('Error deleting old image:', deleteError);
              // Continue even if deletion fails
            }
          }
        }

        // Upload new image
        const uploadResult = await uploadToCloudinary(req.file.buffer, 'team-members');
        data.photo = uploadResult.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({ message: 'Failed to upload image', error: uploadError.message });
      }
    }

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json(teamMember);
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Delete image from Cloudinary if exists
    if (teamMember.photo) {
      const publicId = extractPublicId(teamMember.photo);
      if (publicId) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (deleteError) {
          console.error('Error deleting image from Cloudinary:', deleteError);
          // Continue even if deletion fails
        }
      }
    }

    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
