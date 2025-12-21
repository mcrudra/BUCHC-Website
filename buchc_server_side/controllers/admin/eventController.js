import Event from '../../models/Event.js';
import { body, validationResult } from 'express-validator';

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
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
