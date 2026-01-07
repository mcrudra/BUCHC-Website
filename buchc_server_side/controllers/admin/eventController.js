import Event from '../../models/Event.js';
import { body, validationResult } from 'express-validator';
import { uploadToCloudinary, extractPublicId, deleteFromCloudinary } from '../../utils/cloudinary.js';

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const isNew = req.params.id === 'new';

    if (isNew) {
      return res.json({
        _id: 'new',
        title: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        img: '',
        registration_link: '',
        is_past: false
      });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const data = req.body;

    // Handle image upload if file is provided
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.buffer, 'events');
        data.img = uploadResult.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({ message: 'Failed to upload image', error: uploadError.message });
      }
    }

    // Handle is_past boolean
    if (data.is_past === 'true' || data.is_past === true || data.is_past === 'on') {
      data.is_past = true;
    } else {
      data.is_past = false;
    }

    // Validate required fields
    if (!data.title || !data.date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const event = await Event.create(data);
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const data = req.body;

    // Handle image upload if file is provided
    if (req.file) {
      try {
        // Get existing event to delete old image
        const existingEvent = await Event.findById(req.params.id);
        if (existingEvent && existingEvent.img) {
          const oldPublicId = extractPublicId(existingEvent.img);
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
        const uploadResult = await uploadToCloudinary(req.file.buffer, 'events');
        data.img = uploadResult.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({ message: 'Failed to upload image', error: uploadError.message });
      }
    }

    // Handle is_past boolean
    if (data.is_past === 'true' || data.is_past === true || data.is_past === 'on') {
      data.is_past = true;
    } else {
      data.is_past = false;
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete image from Cloudinary if exists
    if (event.img) {
      const publicId = extractPublicId(event.img);
      if (publicId) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (deleteError) {
          console.error('Error deleting image from Cloudinary:', deleteError);
          // Continue even if deletion fails
        }
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
