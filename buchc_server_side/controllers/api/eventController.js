import Event from '../../models/Event.js';

export const getEvents = async (req, res) => {
  try {
    const upcomingEvents = await Event.find({ is_past: false })
      .sort({ date: 1 });
    
    const pastEvents = await Event.find({ is_past: true })
      .sort({ date: -1 });

    res.json({
      upcomingEvents,
      pastEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
